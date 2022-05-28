import getUserData from '~/assets/js/firebase/getUserData'

export const state = () => ({
  articleCategory: [],
  allArticles: [],
})

export const mutations = {
  fetchCategory(state, payload) {
    state.articleCategory = payload;
  },
  fetchArticles(state, payload) {
    state.allArticles = payload;
  },
}
export const actions = {
  async fetchCategory(vuexContext) {
    const posts = await getUserData({ path: '' })
    const category = []

    //  存入catgory
    for (const post in posts) {
      category.push(posts[post])
    }

    //  重新排列
    const sortCategory = []
    for (let i = 0; i < category.length; i++) {
      sortCategory.push(category[category.length - 1 - i])
    }

    vuexContext.commit('fetchCategory', sortCategory)
  },
  async fetchArticles(vuexContext, payload) {
    const posts = await getUserData({ path: `${payload.articleCategory}/articles` });
    const savePosts = [];

    for(const id in posts){
      savePosts.push({id,article:posts[id]});
    }
    
    vuexContext.commit('fetchArticles',savePosts);

  },
}

export const getters = {
  getArticleCategory(state) {
    return state.articleCategory
  },
  getAllArticles(state) {
    return state.allArticles
  },
}
// }
