import safeFetchJson from "./safeFetchJson";

function fetchCategory(category){
    const categoryElements = safeFetchJson(new URL(category, 'http://localhost:8080/'))
    .then(data=>{
        return data;
    });
    return category;
}

export default fetchCategory;