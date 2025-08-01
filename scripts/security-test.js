#!/usr/bin/env node

const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3001';

// 测试配置
const TESTS = [
  {
    name: '未登录访问管理员页面',
    url: '/admin/posts',
    expectedStatus: [302, 307], // 重定向到登录页面
    description: '应该重定向到登录页面'
  },
  {
    name: '未登录访问管理员仪表盘',
    url: '/admin/dashboard',
    expectedStatus: [302, 307],
    description: '应该重定向到登录页面'
  },
  {
    name: '访问登录页面',
    url: '/admin/login',
    expectedStatus: 200,
    description: '应该正常显示登录页面'
  },
  {
    name: '访问公开页面',
    url: '/',
    expectedStatus: 200,
    description: '应该正常显示首页'
  }
];

// 发送 HTTP 请求
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url, BASE_URL);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'GET',
      ...options
    };

    const req = http.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// 运行测试
async function runTests() {
  console.log('🔒 开始安全测试...\n');
  
  let passedTests = 0;
  let totalTests = TESTS.length;

  for (const test of TESTS) {
    try {
      console.log(`🧪 测试: ${test.name}`);
      console.log(`   访问: ${BASE_URL}${test.url}`);
      
      const response = await makeRequest(test.url);
      
      const expectedStatuses = Array.isArray(test.expectedStatus) ? test.expectedStatus : [test.expectedStatus];
      
      if (expectedStatuses.includes(response.statusCode)) {
        console.log(`   ✅ 通过: ${test.description}`);
        passedTests++;
      } else {
        console.log(`   ❌ 失败: 期望状态码 ${expectedStatuses.join(' 或 ')}，实际 ${response.statusCode}`);
        console.log(`   📝 说明: ${test.description}`);
      }
      
      // 检查重定向
      if (expectedStatuses.includes(302) || expectedStatuses.includes(307)) {
        const location = response.headers.location;
        if (location && location.includes('/admin/login')) {
          console.log(`   ✅ 重定向正确: ${location}`);
        } else {
          console.log(`   ⚠️  重定向可能有问题: ${location}`);
        }
      }
      
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
    }
    
    console.log('');
  }

  // 测试结果汇总
  console.log('📊 测试结果汇总:');
  console.log(`   总测试数: ${totalTests}`);
  console.log(`   通过测试: ${passedTests}`);
  console.log(`   失败测试: ${totalTests - passedTests}`);
  console.log(`   通过率: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 所有安全测试通过！');
    process.exit(0);
  } else {
    console.log('\n⚠️  部分测试失败，请检查安全配置。');
    process.exit(1);
  }
}

// 检查服务器是否运行
async function checkServer() {
  try {
    await makeRequest('/');
    console.log('✅ 服务器正在运行');
    return true;
  } catch (error) {
    console.log('❌ 服务器未运行，请先启动开发服务器: npm run dev');
    return false;
  }
}

// 主函数
async function main() {
  console.log('🚀 AInovalife 安全测试工具\n');
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    process.exit(1);
  }
  
  await runTests();
}

// 运行测试
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { runTests, makeRequest }; 