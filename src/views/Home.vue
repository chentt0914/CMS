<template>
  <div class="home">
    <!-- 侧边栏 -->
    <Sider hide-trigger class="slide">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="" />
        <span>后台管理系统</span>
      </div>
      <Menu
        theme="dark"
        :open-names="['38']"
        accordion
        width="200px"
        :active-name="activedUrl"
        @on-select="keepActived"
        class="menu"
      >
        <!-- 一级菜单 -->
        <Submenu v-for="menu in menuList" :key="menu.id" :name="menu.id">
          <template slot="title">
            <Icon type="menu.icon}}" />
            {{ menu.name }}
          </template>

          <!-- 二级菜单 -->
          <MenuItem
            v-for="item in menu.children"
            :key="item.id"
            :name="item.url"
            :to="item.url"
          >
            {{ item.name }}
          </MenuItem>
        </Submenu>
      </Menu>
    </Sider>

    <Layout class="layout">
      <Header class="header">
        <Breadcrumb>
          <Icon type="ios-arrow-back"></Icon>
          <BreadcrumbItem to="/">Home</BreadcrumbItem>
          <BreadcrumbItem>面包屑</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Content>
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>

<script>
import { getMenu } from '@/network/home';
export default {
  data() {
    return {
      activedUrl: '/main/analysis/dashboard',
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menuList;
    },
  },
  created() {
    this.getMenuList();
  },
  mounted() {
    this.activedUrl = localStorage.getItem('activedUrl');
  },
  methods: {
    // 获取菜单列表
    getMenuList() {
      getMenu().then((res) => {
        // console.log(res);
        this.$store.state.menuList = res.data.data;
      });
    },

    // 保持子菜单活跃状态
    keepActived(activedUrl) {
      localStorage.setItem('activedUrl', activedUrl);

      // this.activedUrl = activedUrl;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  .slide {
    height: 100%;
    position: fixed;
  }
  .logo {
    width: 200px;
    display: flex;
    align-items: center;
    padding: 14px 24px;
    color: #fff;
    font-size: 16px;
    img {
      width: 35px;
      height: 35px;
      padding: 0 5px;
    }
  }
  .layout {
    margin-left: 200px;
  }
  .header {
    background-color: #fff;
    padding: 0 10px;
  }
}
</style>
