import productEditForm from "./components/ProductEditForm.vue";
import productSearch from "./components/productSearch.vue";
import productList from "./components/ProductList.vue";
import product from "./view/product.vue";

const productRouter =

    {
        path: '/product',
        name: 'product',
        component: product,
        children: [
            {
                path: '',
                name: 'list',
                component: productList,
                props: true
            },
            {
                path: 'edit',
                name: 'edit',
                component: productEditForm,
                props: true
            },
            {
                path: 'edit/:id',
                name: 'editWithId',
                component: productEditForm,
                props: true
            }, {
                path: 'search',
                name: 'search',
                component: productSearch,
                props: true
            }
        ]
    }


export default productRouter;