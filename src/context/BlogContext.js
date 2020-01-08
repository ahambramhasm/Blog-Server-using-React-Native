import createDataContext from './createDataContext'
import { ActivityIndicatorComponent } from 'react-native';
import jsonServer from '../api/jsonServer'

const BlogReducer = (state, action) =>{

    switch(action.type){
        case 'get_blogpost': 
        return action.payLoad
        case 'edit_blogpost':
            return state.map ((blogPost)=> {
                return blogPost.id === action.payLoad.id
                ? action.payLoad
                : blogPost
            })
        
        case 'delete_blogpost':
            return state.filter((blogPost)=> blogPost.id !== action.payLoad);
        // case 'add_blogpost':
        //     return [...state, {
        //         id: Math.floor(Math.random()*9999),
        //         title: action.payLoad.title,
        //         content: action.payLoad.content
        //     }]
        default:
            return state;
    }
}
const getBlogPosts = (dispatch) =>{
    return async () =>{
        const response =await jsonServer.get('/blogPost')
        dispatch({type: 'get_blogpost', payLoad:response.data})
    }
}
const addBlogPosts = (dispatch) =>{
    return async (title, content, callback) => {
        await jsonServer.post('/blogPost',{title,content})
    // dispatch({type: 'add_blogpost', payLoad:{title,content}})
    if(callback){callback()}
}
}
const deleteBlogPosts = (dispatch) =>{
    return  async id => {
        await jsonServer.delete(`/blogPost/${id}`)
    dispatch({type: 'delete_blogpost',payLoad:id})
}
}
const editBlogPosts = (dispatch) =>{
return async (id, title, content, callback) =>{
    await jsonServer.put(`/blogPost/${id}`,{title,content})
dispatch({type: 'edit_blogpost',
 payLoad:{id,title,content}})
 if(callback){callback()}
}
}
export const {Context, Provider} = createDataContext(

    BlogReducer,
    {addBlogPosts, deleteBlogPosts, editBlogPosts, getBlogPosts},
    []
)
