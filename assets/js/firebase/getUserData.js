import { getDatabase, ref, child, get } from 'firebase/database'

export default function getUserData({path = ''}) {
  const dbRef = ref(getDatabase());

  return get(child(dbRef, `learn/${path}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val(); 
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
