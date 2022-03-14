var settings = {
  // 每次PPT学习时间，单位：秒(似乎上线600秒)
  ppt_send_time: 600,
}
'use strict';
// 获得当前地址栏的url
function getUrl() {
  return window.location.href;
}
// 点击课程学习
function clickCourse() {
  var menuGroup = document.getElementById('menu-toggle');
  // 点击第三个li里面的a标签
  var li3 = menuGroup.getElementsByTagName('li')[2];
  // 如果li3的class属性中有active，说明已经点击过了，不需要再点击
  if (li3.className.indexOf('active') === -1) {
    var a = li3.getElementsByTagName('a')[0];
    a.click();
  }
}
// 展开所有课程, 并点击未完成的课程学习
function expandAllProcess() {
  var process_container = document.getElementById('indexForm')
  // 找到一级菜单
  var menu1 = process_container.getElementsByClassName('moduleList')
  for (var i = 0; i < menu1.length; i++) {
    var menu2Span = menu1[i].getElementsByTagName('span')[1]
    // 如果menu2Span的class属性中没有open，说明还没有展开，需要点击
    if (menu2Span.className.indexOf('am-icon-caret-right') != -1) {
      menu2Span.click()
    }
  }
  setTimeout(function () {
    for (var i = 0; i < menu1.length; i++) {
      var span = menu1[i].getElementsByTagName('span')
      // 如果span的class属性中有open，说明已经展开了，不需要再展开
      for (var j = 0; j < span.length; j++) {
        if (span[j].className.indexOf('right') != -1) {
          span[j].click()
        }
      }
    }
    // 获得class包含sh-res-b的span
    var span = process_container.getElementsByClassName('sh-res-b')
    setTimeout(function () {
      for (var i = 0; i < span.length; i++) {
        // 如果span的class属性中有active，说明已经点击过了，不需要再点击
        if (span[i].className.indexOf('active') === -1) {
          if (span[i].getElementsByTagName('i')[0].className.indexOf('np-icon-zuoye') != 8) {
            if (span[i].getElementsByTagName('i')[0].className.indexOf('np-icon-ceyan') != 8) {
              if (span[i].getElementsByTagName('i')[0].className.indexOf('np-icon-taolun') != 8) {
                console.log(span[i].getElementsByTagName('i')[0]);
                var parent = span[i].parentNode
                var a = parent.getElementsByTagName('a')[0]
                a.click()
                break
              }
            }
          }
        }
      }
    }, 3000)
  }, 1000)
}
// 判断是什么类型的页面
function isType() {
  var html = document.getElementsByTagName('html')[0]
  // 如果存在video标签，说明是视频页面
  if (html.getElementsByTagName('video').length > 0) {
    return 'video'
  } else if (html.getElementsByTagName('object').length > 0) {
    return 'ppt'
  } else {
    return 'doc'
  }
}
// 下一页
function clickNextPage(courseOpenId) {
  var href = getUrl();
  // 正则表达式获得课程的courseOpenId
  var courseOpenId = href.match(/courseOpenId=([A-Za-z0-9]*)/)[1]
  // 回到课程学习页面，点击下一个
  var studyPage = `https://mooc.icve.com.cn/study/courseLearn/process.html?courseOpenId=${courseOpenId}`
  location.href = studyPage
}
// PPT学习
function pptStudy() {
  var href = getUrl();
  console.log(href);
  // https://mooc.icve.com.cn/study/courseLearn/resourcesStudy.html?courseOpenId=bs3gacauxp9besya1qi41q&cellId=jc3gacauz7xj6t9csznkjg&fromType=stu&moduleId=jc3gacauqqphrse8nvpw#cellIdHash=jc3gacauz7xj6t9csznkjg
  var courseOpenId = undefined || href.match(/courseOpenId=([A-Za-z0-9]*)/)[1]
  var moduleId = undefined || href.match(/moduleId=([A-Za-z0-9]*)/)[1]
  var cellId = undefined || href.match(/cellIdHash=([A-Za-z0-9]*)/)[1]
  console.log(courseOpenId, moduleId, cellId);
  // 循环20次
  var myHeaders = new Headers();
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Microsoft Edge\";v=\"99\"");
  myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  myHeaders.append("X-Requested-With", "XMLHttpRequest");
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36");
  myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
  myHeaders.append("Origin", "https://mooc.icve.com.cn");
  myHeaders.append("Sec-Fetch-Site", "same-origin");
  myHeaders.append("Sec-Fetch-Mode", "cors");
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Referer", "https://mooc.icve.com.cn/study/courseLearn/resourcesStudy.html?courseOpenId=h6mmaruz6nnbo0pnmbk4q&cellId=mqmmaruhrfb2tfjajc1ag&fromType=stu&moduleId=mqmmarun4rhqmpd663qw");
  myHeaders.append("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6");

  var raw = `courseId=&courseOpenId=${courseOpenId}&moduleId=${moduleId}&cellId=${cellId}&auvideoLength=${settings.ppt_send_time}`;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://mooc.icve.com.cn/study/learn/computatlearningTimeLong", requestOptions)
    .then(response => response.text())
    .then(result => clickNextPage())
    .catch(error => console.log('error', error));
}
// 做作业
function IntoHomework() {
  // 找到a标签
  setTimeout(function () {
    var a = document.getElementsByClassName('studoHomework')[0]
    try {
      a.click()
    } catch (e) {
      clickNextPage()
      console.log(e)
    }
  }, 3000)
}
// 做作业
function doHomework() {
  // 找到浮动面版
  var flexDiv = document.getElementById('review')
  flexDiv.style.zIndex = '9999'
  flexDiv.style.height = '70vh'
  flexDiv.style.position = 'fixed'
  flexDiv.style.overflow = 'auto'
  // 超出显示滚动条
  flexDiv.style.overflow = 'auto'
  // 在flexDiv最前面插入一个div
  var div = document.createElement('div')
  div.style.width = '100%'
  div.style.background = 'red'
  div.innerText = '寻找答案中...'
  flexDiv.insertBefore(div, flexDiv.firstChild)
  setTimeout(function () {
    var href2 = document.documentURI
    // 题目盒子
    var questionBox = document.getElementsByClassName('e-q-quest')
    // 匹配courseOpenId
    var courseOpenId = href2.match(/courseOpenId=([A-Za-z0-9]*)/)[1]
    // 匹配workExamId
    var workExamId = href2.match(/workExamId=([A-Za-z0-9]*)/)[1]
    // 匹配workExamType
    var workExamType = href2.match(/workExamType=([A-Za-z0-9]*)/)[1]
    GM_xmlhttpRequest({
      method: "POST",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: `http://zjy.coolcr.cn/mooc/workExam/preview`,
      data: `courseOpenId=${courseOpenId}&workExamId=${workExamId}&workExamType=${workExamType}`,
      onload: function (response) {
        // 转为json
        var resJson = JSON.parse(response.responseText)
        if (resJson.code != 1) {
          div.innerText = '没有答案'
          flexDiv.insertBefore(div, flexDiv.firstChild)
          return
        }
        var answer = resJson.relAnswer
        // 去掉所有标签
        let reg = /<\/?.+?\/?>/g;
        answer = answer.replace(reg, '')
        div.innerText = '作者:梦无念\n博客:https://007666.xyz\n' + answer
        console.log(answer);
        flexDiv.insertBefore(div, flexDiv.firstChild)
      },
      onerror: function (response) {
        div.innerText = '题目获取失败'
        flexDiv.insertBefore(div, flexDiv.firstChild)
      }
    })
  }, 1000)
}
// 视频学习
function videoStudy() {
  setTimeout(function () {
    var video = document.getElementsByTagName('video')[0]
    // 将视频播放到最后
    video.currentTime = video.duration
    // 返回课程学习页面
    setTimeout(function () {
      clickNextPage()
    }, 1000)
  }, 3000)
}
// doc学习
function docStudy() {
  setTimeout(function () {
    // 返回课程学习页面
    clickNextPage()
  }, 3000)
}
// 等到页面加载完毕
window.addEventListener('load', function () {
  // 获得地址栏
  var href = getUrl();
  // 正则表达式获得课程的courseOpenId
  var courseOpenId = href.match(/courseOpenId=([A-Za-z0-9]*)/)[1]
  // 如果是课程学习页面，则点击课程学习
  if (href.indexOf('myCourse') != -1) {
    // 点击课程学习
    clickCourse();
  }
  else if (href.indexOf('process') > 0) {
    // 如果是课程学习页面，则点击未完成的课程学习
    expandAllProcess()
  } else if (href.indexOf('resourcesStudy') > 0) {
    var studyType = isType();
    if (studyType === 'video') {
      // 视频学习
      videoStudy()
    } else if (studyType === 'ppt') {
      pptStudy()
    } else if (studyType === 'doc') {
      // 文档学习
      docStudy()
    } else {
      // 其他类型
    }
  } else if (href.indexOf('homeWork/detail') > 0) {
    // 进入作业
    IntoHomework()
  } else if (href.indexOf('homeWork/preview') > 0) {
    // 做作业
    doHomework()
  }
});