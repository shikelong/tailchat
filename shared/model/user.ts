import { request } from '../api/request';
import { buildCachedRequest } from '../cache/utils';
import { SYSTEM_USERID } from '../utils/consts';

export interface UserBaseInfo {
  _id: string;
  email: string;
  nickname: string;
  discriminator: string;
  avatar: string | null;
  temporary: boolean;
}

export interface UserLoginInfo extends UserBaseInfo {
  token: string;
  createdAt: string;
}

// 内置用户信息
const builtinUserInfo: Record<string, UserBaseInfo> = {
  [SYSTEM_USERID]: {
    _id: SYSTEM_USERID,
    email: 'admin@msgbyte.com',
    nickname: '系统',
    discriminator: '0000',
    avatar: null,
    temporary: false,
  },
};

/**
 * 用户私信列表
 */
export interface UserDMList {
  userId: string;
  converseIds: string[];
}

/**
 * 邮箱登录
 * @param email 邮箱
 * @param password 密码
 */
export async function loginWithEmail(
  email: string,
  password: string
): Promise<UserLoginInfo> {
  const { data } = await request.post('/api/user/login', {
    email,
    password,
  });

  return data;
}

/**
 * 使用 Token 登录
 * @param token JWT令牌
 */
export async function loginWithToken(token: string): Promise<UserLoginInfo> {
  const { data } = await request.post('/api/user/resolveToken', {
    token,
  });

  return data;
}

/**
 * 邮箱注册账号
 * @param email 邮箱
 * @param password 密码
 */
export async function registerWithEmail(
  email: string,
  password: string
): Promise<UserLoginInfo> {
  const { data } = await request.post('/api/user/register', {
    email,
    password,
  });

  return data;
}

/**
 * 创建访客账号
 * @param nickname 访客昵称
 */
export async function createTemporaryUser(
  nickname: string
): Promise<UserLoginInfo> {
  const { data } = await request.post('/api/user/createTemporaryUser', {
    nickname,
  });

  return data;
}

/**
 * 认领访客账号
 */
export async function claimTemporaryUser(
  userId: string,
  email: string,
  password: string
): Promise<UserLoginInfo> {
  const { data } = await request.post('/api/user/claimTemporaryUser', {
    userId,
    email,
    password,
  });

  return data;
}

/**
 * 使用唯一标识名搜索用户
 * @param uniqueName 唯一标识用户昵称: 用户昵称#0000
 */
export async function searchUserWithUniqueName(
  uniqueName: string
): Promise<UserBaseInfo> {
  const { data } = await request.post('/api/user/searchUserWithUniqueName', {
    uniqueName,
  });

  return data;
}

/**
 * 获取用户基本信息
 * @param userId 用户ID
 */
export async function fetchUserInfo(userId: string): Promise<UserBaseInfo> {
  if (builtinUserInfo[userId]) {
    return builtinUserInfo[userId];
  }

  const { data } = await request.get('/api/user/getUserInfo', {
    params: {
      userId,
    },
  });

  return data;
}

/**
 * 获取用户在线状态
 */
export async function getUserOnlineStatus(
  userIds: string[]
): Promise<boolean[]> {
  const { data } = await request.get<boolean[]>(
    '/api/gateway/checkUserOnline',
    {
      params: {
        userIds,
      },
    }
  );

  return data;
}

/**
 * 将会话添加到用户私信列表
 * 如果已添加则后端忽略
 */
export async function appendUserDMConverse(
  converseId: string
): Promise<UserDMList> {
  const { data } = await request.post<UserDMList>(
    '/api/user/dmlist/addConverse',
    {
      converseId,
    }
  );

  return data;
}

/**
 * 修改用户属性
 * @param fieldName 要修改的属性名
 * @param fieldValue 要修改的属性的值
 */
type AllowedModifyField = 'nickname' | 'avatar';
export async function modifyUserField(
  fieldName: AllowedModifyField,
  fieldValue: unknown
): Promise<UserBaseInfo> {
  const { data } = await request.post('/api/user/updateUserField', {
    fieldName,
    fieldValue,
  });

  return data;
}

/**
 * 检查Token是否可用
 */
export const checkTokenValid = buildCachedRequest(
  'tokenValid',
  async (token: string): Promise<boolean> => {
    const { data } = await request.post<boolean>('/api/user/checkTokenValid', {
      token,
    });

    return data;
  }
);
