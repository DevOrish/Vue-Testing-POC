import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import sectionHeader from '@/cmps/section-header';

describe('Test the section header component', () => {
    it('Created and is a vue instance', () => {
        const wrapper = mount(sectionHeader);
        expect(wrapper.vm).toBeTruthy();
    });

    it('Recieves and desplayes the header and btn txt', () => {
        const header = 'Our companies';
        const btnTxt = 'See all';
        const wrapper = mount(sectionHeader, {
            propsData: {
                header,
                btnTxt,
            }
        });
        expect(wrapper.text()).toContain(header);
        expect(wrapper.text()).toContain(btnTxt);
    });

    it('Will route to sent link on button click', async () => {

        const localVue = createLocalVue();
        const router = new VueRouter();
        localVue.use(VueRouter);

        const link = '/org';
        const wrapper = mount(sectionHeader, {
            localVue,
            router,
            propsData: {
                header: 'Our companies',
                btnTxt: 'See all',
                link
            },
        });
        await wrapper.find('button.info-btn').trigger('click');
        expect(wrapper.vm.$route.path).toBe(link);
    });
});