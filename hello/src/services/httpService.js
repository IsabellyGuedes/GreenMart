const httpService = {
    login: (data) => {
        return fetch("http://localhost:3030/user/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }, 
    createUser: (data) => {
    
        return fetch("http://localhost:3030/user/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    },

    getToken: () => {
        return localStorage.getItem("token");
    },

    createProduct: (data) => {
    
        return fetch("http://localhost:3030/product/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
    },

    getProducts: () => {
        return fetch("http://localhost:3030/products",
       {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "Authorization": localStorage.getItem("token")
           }
       })  
   },

   deleteProduct: (productId) => {
    return fetch(`http://localhost:3030/product/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
}
}
export default httpService