# product

The primary database holding business data. Available through message queue RPC calls.

## Queues

### getProduct

Get a specific product.

Input:
```
{
  productId:string,
}
```

Reponse sucess:
```
{
  product:{
    productId:string,
    name:string,
    price:number,
    image:string,
    category:string,
  },
  error:boolean
}
```

Reponse error:
```
{
  error:boolean,
  errorMsg:string
}
```

### getAllProducts

Get all products.

Input: none

Output:
```
{
  productId:string,
  name:string,
  price:number,
  image:string,
  category:string,
}[]
```

### getStoreLocation

Get a specific store location.

Input:
```
{
  storeLocationId:string,
}
```

Reponse sucess:
```
{
  storeLocation:{
    storeLocationId:string,
    name:string,
    coordinates:string,
  },
  error:boolean
}
```

Reponse error:
```
{
  error:boolean,
  errorMsg:string
}
```

### getAllStoreLocations

Get all store locations.

Input: none

Output:
```
{
  storeLocationId:string,
  name:string,
  coordinates:string,
}[]
```
