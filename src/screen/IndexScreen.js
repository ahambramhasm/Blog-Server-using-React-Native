import React,{useContext, useEffect} from 'react'
import {View,Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native'
import {Context} from '../context/BlogContext'

import Icon from 'react-native-vector-icons/Feather'

const IndexScreen=({navigation})=>{

    const {state,  deleteBlogPosts, getBlogPosts, }= useContext(Context)

    useEffect(()=>{
        getBlogPosts()

        const listener = navigation.addListener('didFocus', ()=>{
            getBlogPosts()
        })

        return()=>{
            listener.remove()
        }
    },[])
    return <View>
        
        
        <FlatList
            data= {state}
            keyExtractor={blogPost=>blogPost.title}
            renderItem={({item}) =>{
                return <TouchableOpacity 
                onPress={() =>navigation.navigate('Show', {id :item.id})}>
                    <View style={styles.row}>
                 <Text style={styles.title}>{item.title}</Text>
                 <TouchableOpacity onPress ={() => deleteBlogPosts(item.id)}>
                   <Icon style={styles.icon}
                    name="trash-2"
                    color="black"
                />
                </TouchableOpacity>
                 </View>
                 </TouchableOpacity>
            }}
        />
    </View>

}
IndexScreen.navigationOptions = ({navigation})=>{
return{
    headerRight:<TouchableOpacity 
    onPress={() => navigation.navigate('Create')}>
        <Icon
        name="plus"
        color="black"
        size={30}
        />
    </TouchableOpacity>
}
}
const styles = StyleSheet.create({

    row:{
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: 'grey',
        borderBottomWidth: 1,
        paddingHorizontal: 20
    },
    title:{
        fontSize: 18
    },
    icon:{
        fontSize: 24
    }
})

export default IndexScreen