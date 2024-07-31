// app.js
document.addEventListener('DOMContentLoaded', () => {
    //button to fetch new articles in the fetch request
    document.getElementById('searchButton').addEventListener('click', fetchNews);
    //trigger the news search when the user presses Enter.
    document.getElementById('search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchNews();
        }
    });

    //article links to log the clicks or potentially track which articles are being clicked.
    document.getElementById('news-container').addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            console.log(`Article clicked: ${e.target.href}`);
        }
    });
});

async function fetchNews() {
    const query = document.getElementById('search').value;
    const apiKey = '82f3d640e0ee416f972563736c12b43c';
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data.articles);
        displayNews(data.articles);
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    // Using map to process articles
    const articleElements = articles.map(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'news-article';
        
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'No description available'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        return articleElement;
    });

    articleElements.forEach(element => newsContainer.appendChild(element));
}
