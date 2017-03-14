
import content from 'json!data/content.json';

let pageContent = {     //this will return the content of tha page filtered by language
  getContent(language = 'en') {
    return content.filter(obj => obj.lang === language)[0];
  }

};

module.exports = pageContent;
