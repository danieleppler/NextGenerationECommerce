A website dedicated to e-commerce, offering a seamless platform for selling a wide range of products.

###admin features :
1. Add a new Product category
2. Add new Products
3. See all customer's ordered data (only the ones that gave that permission)
4. See shopping statistics

###user features :
1. Edit account info
2. See Previous orders
3. Buy products

###Main Technolgy  : 
This website was created using React, styled with Bootstrap, and uses Firebase as a serverless data source. 
Also using redux to manage the data on the client side and prevent unnecessary API calls to the Firebase source when no data had changed in the client

###External modules used :
1. chart.js: ^4.4.2 ,react-chartjs-2: ^5.2.0 For showing shopping statistics to the admin
2. redux-persist: ^6.0.0": For persisting redux store data when navigating/refreshing the app
3. react-toastify: ^10.0.5 : For user toasts
4. bootstrap: ^5.3.3: For styling

###Known issues : 
1. Need to add JWT user authentication with firebase.


Launch instructions :
1.clone the repo
2.run in the project folder terminal 'npm i'
3.2.run in the project folder terminal 'npm run dev'

Test Users:
Admin user - 
username:DaniEpp51
password:De040894

costumer :
username:Chef123
password:De040894
