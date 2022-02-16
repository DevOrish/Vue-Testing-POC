import { shallowMount, createLocalVue } from '@vue/test-utils';
import orgEdit from '@/views/org/org-edit';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);


describe('Test the org edit page', () => {

    it('Created and is a vue instance', () => {

        const wrapper = shallowMount(orgEdit, {
            localVue,
            router,
            mocks: {
                $t: () => 'some specific text',

            }
        });
        expect(wrapper.vm).toBeTruthy();
    });

    it('"saveOrg" method is called when form is submitted', async () => {

        const wrapper = shallowMount(orgEdit, {
            localVue,
            router,
            mocks: {
                $t: () => 'some specific text',
            },
        });

        const saveOrg = jest.fn();
        wrapper.vm.saveOrg = saveOrg;

        // Deprecated
        // wrapper.setMethods({
        //     saveOrg:jest.fn();
        // })
        // expect(saveOrg).toHaveBeenCalled();

        await wrapper.find('form').trigger('submit');
        expect(wrapper.vm.saveOrg).toHaveBeenCalled();
    });

    it('"saveOrg" action is called when form is submitted', async () => {

        let actions;
        let store;

        actions = {
            saveOrg: jest.fn(),
        };
        store = new Vuex.Store({
            modules: {
                orgStore: {
                    actions,
                    namespaced: true
                }
            },
        });

        const wrapper = shallowMount(orgEdit, {
            localVue,
            store,
            router,
            mocks: {
                $t: () => 'some specific text',
            },
        });

        await wrapper.find('form').trigger('submit');
        expect(actions.saveOrg).toHaveBeenCalled();

    });


});