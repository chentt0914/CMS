<template>
  <div class="user">
    <!-- 高级检索部分 -->
    <div class="search">
      <Form :model="searchInfo" :label-width="80" class="form" ref="searchRef">
        <h2 style="margin-bottom: 8px">高级检索</h2>
        <Row>
          <Col span="6">
            <FormItem label="用户名">
              <Input
                v-model="searchInfo.name"
                placeholder="请输入用户名"
                clearable
                @on-clear="getUserList"
              >
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="真实姓名">
              <Input
                v-model="searchInfo.ralname"
                placeholder="请输入真实姓名"
                clearable
                @on-clear="getUserList"
              >
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="手机号">
              <Input
                v-model="searchInfo.cellphone"
                placeholder="请输入手机号"
                clearable
                @on-clear="getUserList"
              >
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="用户状态">
              <Select
                v-model="searchInfo.enable"
                placeholder="请选择用户状态"
                clearable
                @on-clear="getUserList"
              >
                <Option value="1">有效 </Option>
                <Option value="0">无效 </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="注册时间">
              <DatePicker
                type="daterange"
                :start-date="new Date(2021, 4, 14)"
                placement="bottom-end"
                placeholder="开始时间 - 结束时间"
                clearable
                @on-clear="getUserList"
              >
              </DatePicker>
            </FormItem>
          </Col>
        </Row>
        <div class="button">
          <Button
            size="large"
            type="primary"
            style="margin-right: 8px"
            @click="getUserList"
          >
            搜索
          </Button>
          <Button size="large" type="default" @click="resetSearchForm"
            >重置</Button
          >
        </div>
      </Form>
    </div>

    <!-- 用户列表部分 -->
    <div class="table">
      <div class="table_header">
        <h3>用户列表</h3>
        <Button type="primary" size="small" @click="addModalVisible = true"
          >新建用户</Button
        >
      </div>
      <Table border ref="selection" :columns="columns" :data="userList">
        <template slot-scope="{ row }" slot="createAt">
          <span>{{ _dayjs(row.createAt).format('YYYY-MM-DD ') }}</span>
        </template>
        <template slot-scope="{ row }" slot="updateAt">
          <span>{{ _dayjs(row.updateAt).format('YYYY-MM-DD') }}</span>
        </template>
        <template slot-scope="{ row }" slot="enable">
          <!-- <Tag color="success" v-if="row.enable == 1">启用</Tag>
          <Tag color="error" v-else>禁用</Tag> -->
          <Tag :color="row.enable == 1 ? 'success' : 'error'">
            {{ row.enable == 1 ? '启用' : '禁用' }}
          </Tag>
        </template>

        <template slot-scope="{ row }" slot="handler">
          <div class="handler">
            <Button type="text" @click="editUser(row.id)">编辑</Button>
            <Button type="text">删除</Button>
          </div>
        </template>
      </Table>
    </div>

    <!-- 新建用户对话框 -->
    <Modal
      v-model="addModalVisible"
      class-name="vertical-center-editModal"
      @on-ok="addUser"
    >
      <div class="modal_title">新增</div>
      <Form
        :model="addUserInfo"
        :label-width="80"
        :rules="addUserRule"
        ref="addUserRef"
      >
        <FormItem label="用户名" prop="name">
          <Input v-model="addUserInfo.name" placeholder="请输入用户名"> </Input>
        </FormItem>
        <FormItem label="真实姓名" prop="realname">
          <Input v-model="addUserInfo.realname" placeholder="请输入真实姓名">
          </Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            v-model="addUserInfo.password"
            type="password"
            placeholder="请输入密码"
          >
          </Input>
        </FormItem>
        <FormItem label="手机号" prop="cellphone">
          <Input v-model="addUserInfo.cellphone" placeholder="请输入手机号">
          </Input>
        </FormItem>
        <FormItem label="用户状态">
          <Select v-model="addUserInfo.enable" placeholder="请选择用户状态">
            <Option
              v-for="item in enableList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>

    <!-- 编辑对话框 -->
    <Modal
      v-model="editModalVisible"
      class-name="vertical-center-editModal"
      @on-ok="editModal"
    >
      <div class="modal_title">编辑</div>
      <Form :model="editUserInfo" :label-width="80">
        <FormItem label="用户名">
          <Input v-model="editUserInfo.name"> </Input>
        </FormItem>
        <FormItem label="真实姓名">
          <Input v-model="editUserInfo.realname"> </Input>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="editUserInfo.password" type="password"> </Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="editUserInfo.cellphone"> </Input>
        </FormItem>
        <FormItem label="用户状态">
          <Select v-model="editUserInfo.enable">
            <Option
              v-for="item in enableList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { getUserList, addUser, getUser, editUser } from '@/network/user';
export default {
  data() {
    return {
      _dayjs: '',

      // 搜素框数据
      searchInfo: {
        name: '',
        realname: '',
        cellphone: '',
        enable: '',
        createAt: '',
      },

      // 用户列表
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          type: 'index',
          title: '序号',
        },
        {
          title: '用户名',
          key: 'name',
        },
        {
          title: '真实姓名',
          key: 'realname',
        },
        {
          title: '手机号',
          key: 'cellphone',
        },
        {
          title: '状态',
          key: 'enable',
          slot: 'enable',
        },
        {
          title: '创建时间',
          key: 'createAt',
          slot: 'createAt',
        },
        {
          title: '更新时间',
          key: 'updateAt',
          slot: 'updateAt',
        },
        {
          title: '操作',
          slot: 'handler',
        },
      ],
      data: [],

      addModalVisible: false,
      addUserInfo: {
        name: '',
        realname: '',
        password: '',
        cellphone: '',
        enable: '',
      },

      addUserRule: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 8,
            message: '长度为2-8个字符',
            trigger: 'blur',
          },
        ],
        realname: [
          {
            required: true,
            message: '真实姓名不能为空',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 8,
            message: '长度为2-8个字符',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          },
          {
            min: 8,
            max: 18,
            message: '长度为8-18个字符',
            trigger: 'blur',
          },
        ],
        cellphone: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur',
          },
          {
            max: 11,
            trigger: 'blur',
          },
        ],
      },

      enableList: [],

      editModalVisible: false,
    };
  },
  computed: {
    userList() {
      return this.$store.state.userList;
    },
    editUserInfo() {
      return this.$store.state.editUserInfo;
    },
  },
  created() {
    this._dayjs = dayjs;
    this.getUserList();
    const enableList = [
      { aaa: '有效', bbb: 1 },
      { aaa: '无效', bbb: 0 },
    ];

    let newArray = enableList
      // .filter((item) => {
      //   console.log(item);
      //   return item.aaa == '有效';
      // })
      .map((item) => {
        return { label: item.aaa, value: item.bbb };
      });
    console.log(newArray);
    this.enableList = newArray;
  },
  methods: {
    getUserList(searchInfo) {
      getUserList({ offset: 0, size: 100, ...this.searchInfo }).then((res) => {
        console.log(res);
        this.$store.state.userList = res.data.data.list;
      });
    },

    resetSearchForm() {
      console.log(this.$refs.searchRef);
      this.$refs.searchRef.resetFields();
      this.getUserList();
    },

    // 新建完点击确认按钮
    addUser() {
      this.$refs.addUserRef.validate((valid) => {
        if (!valid) return;
        console.log(111);
        addUser().then((res) => {
          console.log(res);
        });
        this.getUserList();
        this.addModalVisible = false;
      });

      this.addModalVisible = false;
    },

    // 编辑
    editUser(id) {
      getUser(id).then((res) => {
        console.log(res);
        this.$store.state.editUserInfo = res.data.data;
      });
      this.editModalVisible = true;
    },

    // 编辑完点击确认按钮
    editModal() {
      console.log(111);
      editUser(this.editUserInfo.id).then((res) => {
        console.log(res);

        this.getUserList();

        this.editModalVisible = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  padding: 20px;
  .search {
    padding: 15px 15px 5px;
    margin-bottom: 15px;
    border-radius: 8px;
    background-color: #fff;
    .form {
      h2 {
        text-align: center;
      }
      .button {
        display: flex;
        justify-content: end;
        margin-bottom: 10px;
      }
    }
  }
  .table {
    border-radius: 8px;
    padding: 15px;
    background-color: #fff;
    .table_header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .handler {
      display: flex;
      justify-content: center;
    }
  }
}
.modal_title {
  font-size: 16px;
  text-align: center;
}
</style>
