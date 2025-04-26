import {defineStore, acceptHMRUpdate} from 'pinia';
import {ref} from 'vue';
import {OrderDto} from "../model/OrderDto";
import {
    createOrder, getOrderById,
    getOrders,
    updateOrder, deleteOrder
} from "../service/ressource/order-service";

export const useOrderStore = defineStore('OrderStore', () => {
    const orders = ref<OrderDto[]>([]);
    const selectedOrder = ref<OrderDto | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>("");

    async function dispatchFetchOrders() {
        isLoading.value = true;
        try {
            orders.value = await getOrders();
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function dispatchFetchOrderById(id: number) {
        isLoading.value = true;
        try {
            selectedOrder.value = await getOrderById(id);
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function dispatchAddOrder(order: OrderDto) {
        isLoading.value = true;
        try {
            const createdOrder = await createOrder(order);
            orders.value.push(createdOrder);
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function dispatchUpdateOrder(id: number, order: OrderDto) {
        isLoading.value = true;
        try {
            const updatedOrder = await updateOrder(id, order);
            const index = orders.value.findIndex(o => o.id === updatedOrder.id);
            if (index >= 0) {
                orders.value.splice(index, 1, updatedOrder);
            }
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    }

    async function dispatchRemoveOrder(id: number) {
        isLoading.value = true;
        try {
            await deleteOrder(id);
            const index = orders.value.findIndex(o => o.id === id);
            if (index >= 0) {
                orders.value.splice(index, 1);
            }
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        orders,
        selectedOrder,
        isLoading,
        error,
        dispatchFetchOrders,
        dispatchFetchOrderById,
        dispatchAddOrder,
        dispatchUpdateOrder,
        dispatchRemoveOrder

    };
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOrderStore,
        import.meta.hot))
}