import {acceptHMRUpdate, defineStore} from "pinia";
import {ref} from "vue";
import {ClientDto} from "../model/ClientDto";
import * as service from "../service/ressource/client_service";


export const useClientStore = defineStore('ClientStore', () => {

    //state variable
    const clients = ref<ClientDto[]>([]);
    const selectedclient  = ref<ClientDto | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>("");

    //add action functions here

    const dispatch_fetch_clients = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            clients.value = await service.fetchClients()
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }
    const dispatch_fetch_client_byid = async (id: number) => {
        isLoading.value = true;
        error.value = null;
        try {
            selectedclient.value = await service.fetchClientById(id)
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }
    const dispatch_create_clients = async (client: ClientDto) => {
        isLoading.value = true;
        error.value = null;
        try {
            await service.createClient(client);
            //add the created client to local list
            clients.value.push(client)
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }
    const dispatch_update_clients = async (id: number, client: ClientDto) => {
        isLoading.value = true;
        error.value = null;
        try {
            await service.updateClient(id, client);
            //update the local clients.value
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }
    const dispatch_delete_clients = async (id: number) => {
        isLoading.value = true;
        error.value = null;
        try {
            await service.deleteClient(id);
            //delete from the local clients.value
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }


    return {
        clients,
        selectedclient,
        isLoading,
        error,
        //add your functions here
        dispatch_fetch_clients,
        dispatch_fetch_client_byid,
        dispatch_create_clients,
        dispatch_update_clients,
        dispatch_delete_clients
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot));
    import.meta.hot.dispose(() => useClientStore().$dispose());
}


