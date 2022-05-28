import { getDatabase, ref, set, push, remove } from 'firebase/database'
import getUserData from '@/assets/js/firebase/getUserData.js';

export default function writeUserData({
  category,
  imageUrl,
  routeQuery,
  articleParameters,
  articleId=''
}) {
  const db = getDatabase()

  let updatePath = `learn/${category}/`

  //  判斷是否為上傳類別，"若是"執行以下程式，若否，執行else
  if (imageUrl) {
    const uploadData = {
      title: category,
      imageUrl,
      articles: '',
    }

    const updatePlace = ref(db, updatePath)
    const uploadParameters = {
      category,
      imageUrl,
      routeQuery,
      uploadData,
      updatePlace,
    }

    return uploadCategory(uploadParameters)

    //  上傳的地方，若是category -> 上傳至 `learn/${category}/` ，不然就上傳至 `learn/${category}/articles`
  } else {
    updatePath = `learn/${category}/articles/`;
    
    if(articleId){
      updatePath += articleId;
      return editArticles({updatePath,articleParameters});
    }
    
    return uploadArticles({ updatePath, articleParameters })
  }
}

async function uploadCategory({
  category,
  imageUrl,
  routeQuery,
  uploadData,
  updatePlace,
}) {
  //  一  判斷是否為修改便資料
  if (routeQuery.categoryTitle) {
    //  1. 若修改資料，無更改內容 return;
    if (
      routeQuery.imageUrl === imageUrl &&
      routeQuery.categoryTitle === category
    ) {
      return
    }

    //  2. 若修改資料，有更改內容，需複製原本的資料，並刪除舊的檔案
    const oldPlace = `learn/${routeQuery.categoryTitle}`
    const oldArticles = await getUserData({path:`${routeQuery.categoryTitle}/articles`});
    uploadData.articles = oldArticles;
    console.log(uploadData);

    await set(updatePlace, uploadData)

    //  3. 若是title相同，image不同，不用刪除資料
    if (
      routeQuery.categoryTitle === category &&
      routeQuery.imageUrl !== imageUrl
    ) {
      return
    }
    return remove(ref(getDatabase(), oldPlace))
  }

  //  二  若是新增資料直接用set
  return set(updatePlace, uploadData)
}

function uploadArticles({ updatePath, articleParameters }) {
  return push(ref(getDatabase(), updatePath), articleParameters)
}

function editArticles({updatePath,articleParameters}){
  return set(ref(getDatabase(), updatePath), articleParameters);
}
