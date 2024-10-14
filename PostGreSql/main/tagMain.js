import TagService from "../services/tagServices.js";
import Tags from "../entity/tags.js";

//Tags
const tagService = new TagService();

//CREATE A NEW TAG.
// await tagService.createTag('Estudando','#fff');
 
//LIST ALL Tags
// const listTags =  await tagService.listTags();
// console.log(listTags);

//LIST A ESPECIFIC task.
const listTag =  await tagService.readTag(1);
console.log(listTag)


//UPDATE A TAG.
// const tagUpdate =  new Tags('Estudar Matematica','Green');
// console.log(await tagService.updateTag(7,tagUpdate));

//DELETE A TAG
// console.log( await tagService.deleteTag(7));;