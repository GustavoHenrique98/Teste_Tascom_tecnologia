import Tags from "../entity/tags.js";
import TagRepository from "../repository/tagRepository.js";

class TagService{
    TagRepository;
    constructor(){
        this.TagRepository = new TagRepository();
    }

    async createTag(name,color){
        if(!name || !color){
            console.log('Error: The name and color parameters are required to use this function!');
            return;
        }else{
            try{
              const newTag = new Tags(name,color);
              await this.TagRepository.create(newTag);
            }catch(error){
              console.log(`Error:${error}`);
            }

        }
    }

    async listTags(){
        try{
            const tagList = await this.TagRepository.list();
            return tagList;
        }catch(error){
            console.log(`Error:${error}`);
        }
    }

    async readTag(TagId){
        if(!TagId){
            console.log('The TagId parameter are required to use this function!');            
        }else{
            try{
                const readTag = await this.TagRepository.read(TagId);
                if(readTag === null){
                    return 'Invalid Tag id!';
                }else{
                    return readTag;
                }
            }catch(error){
                console.log(`Error:${error}`);
            }
        }
    }

    async updateTag(TagId,tag){
        if(!TagId || !tag){
            console.log('Error: The tag id and the instantiated object with the updated attributes need to be passed to use this function!');            
        }else{
            try{
                const updatedTag = await this.TagRepository.update(TagId,tag);
                if(updatedTag === null){
                    return 'Invalid Tag id!';
                }else{
                    return updatedTag;
                }
            }catch(error){
                console.log(`Error:${error}`);
            }
        }
    }

    async deleteTag(TagId){
        if(!TagId){
            console.log('The TagId parameter are required to use this function!');            
        }else{
            try{
                const deletedTag = await this.TagRepository.delete(TagId);
                if(deletedTag === null){
                    return 'Invalid Tag id!';
                }else{
                    return deletedTag;
                }
            }catch(error){
                console.log(`Error:${error}`);
            }
        }
    }
}

export default TagService;