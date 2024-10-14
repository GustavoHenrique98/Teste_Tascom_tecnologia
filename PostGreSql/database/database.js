import pg from 'pg';
const {Pool} = pg;
import PostGreConfig from './PostGreConfig.js';

const conection = new Pool(PostGreConfig);

export const checkConnection = async () => {
  try {
      await conection.connect();
      console.log('Connection to PostgreSQL successful!');
  } catch (error) {
      console.error(`Error connecting to PostgreSQL: ${error.message}`);
  }
};


export default conection;