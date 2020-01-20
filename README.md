## 前端Markdown解析工具
个人练习项目，基于前端实现markdown解析渲染，支持传入自定义md文件链接，在地址后传入参数 `index.html?url=md文件路径` 即可，此项目使用到的开源项目如下：

- [Vue.js](https://vuejs.org)              
- [Highlight.js](https://highlightjs.org)             
- [HyperDown.js](https://github.com/SegmentFault/HyperDown.js)             

## TODO               
- 语法解析增强 [未完成]； 
- ~~完善UI~~ [已完成]；             
- ~~目录树解析~~ [已完成]；             



## 表格示例

| 1    | 2    | 3    | 4    |
| ---- | ---- | ---- | ---- |
| 1    | 2    | 3    | 4    |
| 1    | 2    | 3    | 4    |
| 1    | 2    | 3    | 4    |
| 1    | 2    | 3    | 4    |


## 代码块演示

```
#define N 5
#define LEFT (i + N - 1) % N // 左邻居
#define RIGHT (i + 1) % N    // 右邻居
#define THINKING 0
#define HUNGRY   1
#define EATING   2
typedef int semaphore;
int state[N];                // 跟踪每个哲学家的状态
semaphore mutex = 1;         // 临界区的互斥，临界区是 state 数组，对其修改需要互斥
semaphore s[N];              // 每个哲学家一个信号量

void philosopher(int i) {
    while(TRUE) {
        think(i);
        take_two(i);
        eat(i);
        put_two(i);
    }
}

void take_two(int i) {
    down(&mutex);
    state[i] = HUNGRY;
    check(i);
    up(&mutex);
    down(&s[i]); // 只有收到通知之后才可以开始吃，否则会一直等下去
}

void put_two(i) {
    down(&mutex);
    state[i] = THINKING;
    check(LEFT); // 尝试通知左右邻居，自己吃完了，你们可以开始吃了
    check(RIGHT);
    up(&mutex);
}

void eat(int i) {
    down(&mutex);
    state[i] = EATING;
    up(&mutex);
}

// 检查两个邻居是否都没有用餐，如果是的话，就 up(&s[i])，使得 down(&s[i]) 能够得到通知并继续执行
void check(i) {         
    if(state[i] == HUNGRY && state[LEFT] != EATING && state[RIGHT] !=EATING) {
        state[i] = EATING;
        up(&s[i]);
    }
}

```


# 目录树演示

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题


More…