
import content from 'json!data/content.json';

let pageContent = {     //this will return the content of tha page filtered by language
  getContent(language = 'en') {
    return content.find(obj => obj.lang === language);
  }

};

module.exports = pageContent;
