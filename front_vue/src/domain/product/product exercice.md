**Backend API (Conceptual):**

Assume your Spring Boot backend exposes the following endpoints:

* `GET /api/products`: Get all products (returns a list of product objects).
* `GET /api/products/{id}`: Get a specific product by ID (returns a single product object).
* `POST /api/products`: Create a new product (takes a product object in the request body).
* `PUT /api/products/{id}`: Update an existing product (takes a product object in the request body).
* `DELETE /api/products/{id}`: Delete a product by ID.

**Product Interface (TypeScript):**

```typescript
export interface Product {
  id?: number; // Optional for new products
  name: string;
  description?: string;
  price: number;
}
```

**Exercise 1: Fetching and Displaying a List of Products**

1.  **Create a Pinia store** named `productStore` (`src/stores/productStore.ts`):
    * State:
        * `products`: An array of `Product` initialized as an empty array (`[]`).
        * `loading`: A boolean initialized to `false`.
        * `error`: A string or `null` initialized to `null`.
    * Actions:
        * `fetchProducts()`:
            * Sets `loading` to `true`.
            * Uses `fetch` (or a library like Axios) to call the `GET /api/products` endpoint.
            * If successful, updates the `products` state with the fetched data and sets `loading` to `false` and `error` to `null`.
            * If there's an error, sets `loading` to `false` and updates the `error` state with the error message.

2.  **Create a Vue 3 component** named `ProductList.vue`:
    * Uses the `productStore`.
    * In its `onMounted` hook, calls the `fetchProducts()` action.
    * Displays a "Loading..." message while `loading` is `true`.
    * Displays an error message if `error` is not `null`.
    * If `products` has data, renders a list of products, showing their `name` and `price`.

3.  **Write Jest tests** (`tests/unit/ProductList.spec.ts`):
    * Mock the `productStore` and its `fetchProducts` action.
    * Test the initial state of the component (loading should be true initially).
    * Simulate a successful `fetchProducts` call (mock the resolved value) and assert that the product list is rendered correctly and the loading state is false.
    * Simulate a failed `fetchProducts` call (mock the rejected value) and assert that the error message is displayed and the loading state is false.

**Exercise 2: Creating a New Product**

1.  **Update the `productStore` (`src/stores/productStore.ts`):**
    * Add a new action `createProduct(newProduct: Omit<Product, 'id'>)`:
        * Sets `loading` to `true`.
        * Uses `fetch` (or Axios) to call the `POST /api/products` endpoint, sending the `newProduct` in the request body (as JSON).
        * If successful, it might be useful to fetch the updated product list again or add the new product to the existing `products` array. Sets `loading` to `false` and `error` to `null`.
        * If there's an error, sets `loading` to `false` and updates the `error` state.

2.  **Create a Vue 3 component** named `ProductCreateForm.vue`:
    * Uses the `productStore`.
    * Has a form with input fields for `name`, `description`, and `price`.
    * Has a button to submit the form.
    * When the form is submitted, it should:
        * Collect the form data.
        * Call the `createProduct()` action from the store.
        * Potentially provide feedback to the user (e.g., a success message or display any errors).

3.  **Write Jest tests** (`tests/unit/ProductCreateForm.spec.ts`):
    * Mock the `productStore` and its `createProduct` action.
    * Simulate user input in the form fields.
    * Simulate a form submission.
    * Assert that the `createProduct` action in the store was called with the correct product data.
    * Test scenarios for both successful and failed product creation (by mocking the `createProduct` action's resolved/rejected promises).

**Exercise 3: Editing and Updating an Existing Product**

1.  **Update the `productStore` (`src/stores/productStore.ts`):**
    * Add a new action `updateProduct(updatedProduct: Product)`:
        * Sets `loading` to `true`.
        * Uses `fetch` (or Axios) to call the `PUT /api/products/{id}` endpoint, sending the `updatedProduct` in the request body.
        * If successful, updates the corresponding product in the `products` array in the state. Sets `loading` to `false` and `error` to `null`.
        * If there's an error, sets `loading` to `false` and updates the `error` state.

2.  **Create a Vue 3 component** named `ProductEditForm.vue`:
    * This component would likely receive a `productId` as a prop to fetch the specific product details.
    * Uses the `productStore`.
    * In its `onMounted` hook (or when the `productId` prop changes), it should call an action in the store to fetch the product details (`GET /api/products/{id}`). Add this action to your `productStore`.
    * Has a form pre-filled with the product's current data.
    * Has a button to save the changes.
    * When the form is submitted, it should:
        * Collect the updated form data (including the `id`).
        * Call the `updateProduct()` action from the store.
        * Provide feedback to the user.

3.  **Write Jest tests** (`tests/unit/ProductEditForm.spec.ts`):
    * Mock the `productStore` and its `fetchProduct` and `updateProduct` actions.
    * Provide a mock `productId` as a prop to the component.
    * Assert that the `fetchProduct` action is called correctly on mount.
    * Simulate user input in the form fields.
    * Simulate a form submission.
    * Assert that the `updateProduct` action was called with the correct updated product data.
    * Test success and failure scenarios for fetching and updating.

**Exercise 4: Deleting a Product**

1.  **Update the `productStore` (`src/stores/productStore.ts`):**
    * Add a new action `deleteProduct(id: number)`:
        * Sets `loading` to `true`.
        * Uses `fetch` (or Axios) to call the `DELETE /api/products/{id}` endpoint.
        * If successful, removes the deleted product from the `products` array in the state. Sets `loading` to `false` and `error` to `null`.
        * If there's an error, sets `loading` to `false` and updates the `error` state.

2.  **Update the `ProductList.vue` component:**
    * Add a button (e.g., "Delete") next to each product in the list.
    * When the delete button is clicked, it should call a method in the component that then dispatches the `deleteProduct()` action from the store with the product's `id`.

3.  **Write Jest tests** (`tests/unit/ProductList.spec.ts`):
    * Mock the `productStore` and its `deleteProduct` action.
    * Render the `ProductList` with some mock product data.
    * Find a delete button for a specific product.
    * Simulate a click on the delete button.
    * Assert that the `deleteProduct` action was called with the correct `id`.
    * Test success and failure scenarios for deletion.

**Key Concepts to Focus On:**

* **Asynchronous Actions:** Handling promises returned by `fetch` or Axios.
* **State Management:** Updating the store's state based on API responses.
* **Component Interaction:** Dispatching actions from components and displaying state/getters.
* **Mocking External Dependencies:** Mocking API calls (`fetch` or Axios) in your tests to isolate the frontend logic.
* **Testing Loading and Error States:** Ensuring your components handle these states gracefully.
* **Testing Data Transformations:** If you have any logic to transform the data received from the backend, make sure to test that as well (potentially within getters or actions).

These exercises provide a more practical context for your skills. Remember to think about error handling, loading states, and how your components interact with the Pinia store to manage data from a backend API. Good luck!