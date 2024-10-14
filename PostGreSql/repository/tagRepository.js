// Entity
import Tags from '../entity/tags.js';
//Conection with the database PostGreSql
import conection from '../database/database.js';

class TagRepository{
    async create(tag){
        try{
            const results = await conection.query('INSERT INTO Tags (name , color) VALUES($1 , $2)',
            [tag.name , tag.color]);
            console.log('Tag created sucessfull!');
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }   
    
    async list(){
        try{
            const results = await conection.query('SELECT * FROM Tags');
            return results.rows;
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }

    async read(TagId){
        try{
            const results = await conection.query('SELECT * FROM Tags WHERE ID = $1',[TagId]);
            const tag = results.rows[0]
            if(tag === undefined){
                return null;
            }else{
                return new Tags(tag.name , tag.color , tag.id);
            }
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }

    async update(TagId,tag){
        try{
            const results = await conection.query('UPDATE Tags SET name = $1 , color = $2 WHERE ID = $3',
            [tag.name, tag.color, TagId]);
            
            const tagUpdated = results.rowCount;
            if(tagUpdated === 0){
                return null;
            }else{
                console.log('Tag updated sucessfull');
            }
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }

    async delete(TagId){
        try{
            const results = await conection.query('DELETE FROM Tags WHERE ID = $1',[TagId]);
            const deletedTag = results.rowCount;
            if(deletedTag === 0){
                return null;
            }else{
                console.log('Tag deleted sucessful!!');
            }
        }catch(error){
            console.log(`ERROR : ${error}`);
        }
    }
}


export default TagRepository;