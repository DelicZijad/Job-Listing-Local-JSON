'use strict';
const container=document.getElementById('main')
const categories=document.getElementsByClassName('post--categories')
const display=document.querySelector('.display')
//getting the data from our json file
const getJobs=async()=>{
    const response=await fetch('data.json');
    const data=await response.json()
    return data;
}

const create=async()=>{
    const jobs=await getJobs()
    //using the data
    jobs.forEach(job=>{
        /*
   after getting the data we create posts,and every element within with a function called construct     
        */
       const section=construct('section','post')
       const content=construct('div','post--content')
       const main=construct('div','post--main')
       const logo=construct('div','post--logo')
       const img=elmCreate('img')
       img.src=job.logo;
       logo.append(img);
       const info=construct('div','post--info')
       const basic=construct('div','post--basic')
       const companyName=construct('p','post--name',job.company)
        basic.append(companyName)
       if(job.new){
        const neww=construct('p','post--new',"NEW!")
        basic.append(neww)
       }
       if(job.featured){
        const feature=construct('p','post--featured',"FEATURED")
        basic.append(feature)
     section.classList.add('leftBorder')
       }
       const position=construct('p','post--position',job.position)
       const desc=construct('div','post--desc')
       const posted=construct('p',null,job.postedAt)
      desc.append(posted)
       const contract=construct('p',null,job.contract)
      desc.append(contract)
       const location=construct('p',null,job.location)
      desc.append(location)
       const categories=construct('div','post--categories')
       const tags=[...job.tools,...job.languages,job.level,job.role]
    tags.forEach(tag=>{
        /*
        for all the tags related to a post we create filters found on the right(bottom-mobile)of the post,and on each add an addEventListener method
         */
        const category=construct('p','post--category',tag)
        categories.append(category)
        section.classList.add(category.textContent)
        category.addEventListener('click',addTag)
     })
       info.append(basic)
       info.append(position)
       info.append(desc)
       main.append(logo)
       main.append(info)
       content.append(main)
       content.append(categories)
       section.append(content)
          container.append(section)
    })
}

const elmCreate=(elm)=>document.createElement(elm)
const construct=(elm,className,txt)=>{
const some=document.createElement(elm);
if(className)some.classList.add(className)
if(txt)some.textContent=txt
return some
}
function addTag(){
    /*
     clicking on one of the filters will make the display section (re)appear and also create a tag div within it
     with filter and close elements
    */
     display.classList.remove('invisible')
     const tag=construct('div','display--tag')
     const filter=construct('p','display--filter',this.textContent)
    const close=construct('p','display--close','X');
     tag.append(filter)
     tag.append(close)
     display.querySelector('.display--tags').append(tag)
     const tags=display.getElementsByClassName('display--tag')
/*
all the tag elements created
*/
const arr=Array.from(tags)
arr.forEach(tag=>{
    const filt=tag.querySelector('.display--filter')
    const close=tag.querySelector('.display--close')
        const categories=document.getElementsByClassName('post--category')
    const posts=document.getElementsByClassName('post')
    /*
    when we click on a filter and create a tab we have to make sure that the filter with the same content is 'muted'(we can't have repeating 'filters in the display')
    */
         Array.from(categories).forEach(cat=>{
        if(cat.textContent===filt.textContent)cat.removeEventListener('click',addTag)
    })
    /*
    we go through every post and check if the post has related to it(classList) all the filters in the display.
If so it will be shown.
    */
 Array.from(posts).forEach(post=>{
    if(arr.every(arg=>post.classList.contains(arg.querySelector('.display--filter').textContent)))post.classList.remove('hide');
    else post.classList.add('hide')
 })
    close.addEventListener('click',function(e){
        
                Array.from(categories).forEach(cat=>{
        if(cat.textContent===filt.textContent)cat.addEventListener('click',addTag)
    })
    /*
    affter hitting close on one of the tags, the tag will be removed as an element
     */
    const cont= document.getElementsByClassName('display--tags')[0]
cont.removeChild(tag)
   const items=Array.from(document.getElementsByClassName('display--tag'))
   /*
   all the existing tags after we hit each close
    */
   Array.from(posts).forEach(post=>{
    if(items.every(item=>post.classList.contains(item.querySelector('.display--filter').textContent))){
        post.classList.remove('hide')
    }
    /*
    If there are no tags all posts are shown
     */
    else if(items.length===0) {
        post.classList.remove('hide')
    }
    else post.classList.add('hide')
 })
 if(items.length===0) document.querySelector('.display').classList.add('invisible')
})
document.getElementById('clear').addEventListener('click',function(){
     Array.from(categories).forEach(cat=>{
        if(cat.textContent===filt.textContent)cat.addEventListener('click',addTag)
    })
      const cont= document.getElementsByClassName('display--tags')[0]
   const items=Array.from(document.getElementsByClassName('display--tag'))
   /*
   after hitting clear all existing tags in the display are removed and all posts are shown
    */
   items.forEach(item=>cont.removeChild(item))
    Array.from(posts).forEach(post=>{
    post.classList.remove('hide')
 })
this.parentElement.classList.add('invisible')
})

})
}
create()


