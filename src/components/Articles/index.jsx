import { useState, useEffect } from "react";
import CreatePostButton from "./create";

const Articles = () => {
  const [articles, setArticles] = useState([])

 // RECUPERER LES DONNEES POUR LA LISTE
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://testapiback.fly.dev', {
        method: 'get',
        headers: {
          // 'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const jsonData = await response.json();
        const reversedData = jsonData.reverse();
        setArticles(reversedData);
      } else {
        throw new Error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur de requête : ', error)
    }
  };
  fetchData()
}, []);



return (
  <div>
    <h3>Voici la liste des articles</h3>
      {articles.map(article => {
        return (
          <div key={article.id}>
            <p>article n° : {article.id}</p>
            <p>titre : {article.title} </p>
            <p>contenu : {article.content}</p>
            <p>*******************</p>
          </div>
        )
      })}
      <CreatePostButton/>
  </div>
)
}

export default Articles
