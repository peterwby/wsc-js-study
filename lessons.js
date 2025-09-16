const LESSONS = [
  {
    day: 1,
    title: "程序与变量（类型：数字、字符串、布尔型、数组、对象、null）",
    intro: `
      <p>程序本质：输入 → 处理 → 输出。变量是"装数据的盒子"，用来存储程序运行过程中的数据。</p>
      <p>常见类型：<code>数字型number</code>、<code>字符串型string</code>、<code>布尔型boolean</code>、<code>未定义undefined</code>、<code>空值null</code> 、 <code>对象object</code>、 <code>数组array</code>。</p>      
      <p><b>变量 vs 常量：const 与 let</b></p>
      <ul>
        <li><b>变量（let）</b>：像"可变动的计数板"，里面的值可以改变。比如计数器、用户输入、计算结果等。
          <div>示例：<code>let retries = 0; retries = retries + 1;</code>；<code>let currentPage = 1;</code> 翻页时 <code>currentPage++</code>。</div>
          <div>适用：计数器、累加器、状态切换（如 loading→done）。</div>
        </li>
        <li><b>常量（const）</b>：像"贴了名字的盒子"，一旦设定就不能改变。但对象/数组允许改内容。
          <div>示例：<code>const cart = [];</code> 之后可以 <code>cart.push(x)</code>，但不能 <code>cart = newCart</code> 把盒子换掉。</div>
          <div>适用：配置、资料卡、不会被重新指向的数据集合。</div>
        </li>
        <li><b>经验法则</b>：
          <ul>
            <li>默认用 <code>const</code>，只有当你真的需要"重新赋值（= 重新指向）"时，改用 <code>let</code>。</li>
            <li>自问一句：后面会不会给这个变量再次用 <code>=</code> 赋新值？会→<code>let</code>；不会→<code>const</code>。</li>
          </ul>
        </li>
      </ul>
      <p><b>在什么场景要用变量？</b> 当一个数据会被多次使用、会变化、或需要被命名以便理解时。例如：超市收银要计算应付金额。</p>
      <pre>场景：收银台
1) 用户买了 2 瓶饮料，每瓶 3.5 元；
2) 有 10% 折扣；
如何算应付？

// 范例
const price = 3.5;      // 单价（不变，const）
let qty = 2;            // 数量（可能变化，let）
const discountRate = 0.1; // 折扣 10%
const total = price * qty;               // 小计
const pay = total * (1 - discountRate); // 应付
console.log(pay); // 6.3
</pre>
      <pre>// 为什么需要 let？
// 用户又拿了一瓶 → 数量要 +1
qty = qty + 1; // 或 qty += 1
const newTotal = price * qty;
const newPay = newTotal * (1 - discountRate);
console.log(newPay); // 9.45
</pre>
      <p><b>数组与对象</b></p>
      <ul>
        <li>数组（array）：像一排座位或购物车里的商品队列，位置从 0 开始排号，<code>fruits[0]</code> 就是第一个座位/第一个商品。适合“同类项的集合”。
          <ul>
            <li>常见操作：为数组添加元素、删除元素、遍历数组。</li>
            <li>例：<code>const cart = [{name:'可乐', price:3.5}, {name:'面包', price:6}]</code></li>
          </ul>
        </li>
        <li>对象（object）：像一张“信息卡”或资料袋，每个格子都有名字，<code>user.name</code> 就是取“姓名”格。适合“一个事物的属性包”。
          <ul>
            <li>更像字典/映射：<code>const user = { id:1, name:'Tom', vip:true }</code></li>
          </ul>
        </li>
        <li><i>它们与简单数据类型（number/string/boolean）有什么不同？</i>
          <ul>
            <li>简单类型只有一个值；数组/对象是“容器”，可以装很多值，还能嵌套。</li>
            <li>数组按“位置号”取值，比如取数组arr的第一个元素用 arr[0]；对象按“名字键”取值，比如取对象obj的name属性用 obj.name。</li>
            <li>描述“一组东西”用数组；描述“一个东西的多个属性”用对象。</li>
          </ul>
        </li>
      </ul>
      
      <p><b>小贴士：数组与对象怎么选？</b> 如果你在列清单（很多相同种类）→ 用 <code>数组</code>；如果你在填表（同一个东西的不同栏位/属性）→ 用 <code>对象</code>。取数组的第一个元素用 <code>arr[0]</code>，取对象的“姓名”属性用 <code>obj.name</code>。</p>
      <p><b>编程思路</b></p>
      <pre>需求：给出 3 个分数，输出平均分，并提示是否达标（≥ 90：优秀）。
具体思路：这个问题的核心是"计算平均分"和"判断等级"两个步骤。我们可以用数组存储所有分数（为什么用数组而不用对象？因为分数是同一种类型的数据，用数组更方便），用循环来求和，然后计算平均值，最后用条件判断来输出等级。
步骤：
1) 分析需求：程序要做什么？
   - 输入：3个分数
   - 处理：计算平均分，判断等级
   - 输出：平均分数 + 等级

2) 选择数据结构：为什么用数组？
   - 分数都是数字类型，用数组 [95, 88, 76] 比对象更合适
   - 数组可以用循环遍历，对象需要知道具体属性名

3) 分解算法步骤：
   - 步骤1：循环遍历数组，把所有分数加起来，得到总和
   - 步骤2：用总和除以分数的个数，得到平均分
   - 步骤3：判断平均分是否≥90，决定输出"优秀"还是"继续加油"

4) 动手实现：
   let sum = 0; // sum初始设置为0
   for(const x of scores){ sum += x } // 循环求和，得到 sum
   const avg = sum / scores.length // 计算平均分， scores.length的意思是数组的长度，也就是分数的个数
   const msg = avg >= 90 ? '优秀' : '继续加油' // 判断是否达标，如果 >= 90 表示优秀，否则继续加油
   console.log(avg, msg) // 输出平均分和提示

5) 验证思路：如何确保程序正确？
   - 用 [100, 100, 100] 测试：应该输出 100, "优秀"
   - 用 [60, 70, 80] 测试：应该输出 70, "继续加油"
  </pre>
    <p>
      <b>进一步学习</b>：如果想系统看“变量/数据类型”的完整语法，请参考
      <a href="https://www.runoob.com/js/js-variables.html" target="_blank" rel="noopener">变量（runoob）</a>
      与
      <a href="https://www.runoob.com/js/js-datatypes.html" target="_blank" rel="noopener">数据类型（runoob）</a>。
    </p>
    `,
    questions: [
      {
        id: 1,
        type: "text",
        title: "声明变量",
        content: "请写出用 let 声明变量 a 并赋值为 10 的代码（不带分号也可）。",
        hint: "以 let 开头，变量名是 a，赋值运算符是 =。",
        solution: "let a = 10",
        validatorRegex: "^\\s*let\\s+a\\s*=\\s*10\\s*;?\\s*$",
      },
      {
        id: 102,
        type: "text",
        title: "创建数组与对象",
        content: '请创建一个数组 nums 含 [1,2,3]，以及对象 user 含 name 为 "Tom"。',
        hint: "数组用 [ ]，对象用 { }；属性名不加引号也行。",
        solution: 'const nums = [1,2,3]; const user = { name: "Tom" }',
        validatorRegex:
          "const\\s+nums\\s*=\\s*\\[\\s*1\\s*,\\s*2\\s*,\\s*3\\s*\\]\\s*;?\\s*const\\s+user\\s*=\\s*\\{\\s*name\\s*:\\s*[\"']Tom[\"']\\s*\\}\\s*;?",
      },
      {
        id: 110,
        type: "text",
        title: "访问与修改数组元素",
        content: '创建数组 fruits=["apple","banana"]，输出第一个元素，然后把第二个改为 "pear" 并再次输出整个数组。',
        hint: 'fruits[0] 访问第一个；fruits[1] = "pear"；console.log(fruits)。',
        solution: 'const fruits=["apple","banana"]; console.log(fruits[0]); fruits[1] = "pear"; console.log(fruits)',
        validatorRegex:
          "const\\s+fruits\\s*=\\s*\\[\\s*[\"']apple[\"']\\s*,\\s*[\"']banana[\"']\\s*\\]([\\s\\S]*fruits\\s*\\[\\s*0\\s*\\])[\\s\\S]*fruits\\s*\\[\\s*1\\s*\\]\\s*=\\s*[\"']pear[\"']",
      },
      {
        id: 111,
        type: "text",
        title: "访问与修改对象字段",
        content: '创建对象 user={name:"Tom", age:18}，输出 name，然后把 age 改为 19 并输出整个对象。',
        hint: "user.name 访问；user.age = 19；console.log(user)。",
        solution: 'const user={name:"Tom", age:18}; console.log(user.name); user.age=19; console.log(user)',
        validatorRegex:
          "const\\s+user\\s*=\\s*\\{[\\s\\S]*name[\\s\\S]*age[\\s\\S]*\\}[\\s\\S]*console\\.log\\s*\\(\\s*user\\.name\\s*\\)[\\s\\S]*user\\.age\\s*=\\s*19[\\s\\S]*console\\.log\\s*\\(\\s*user\\s*\\)",
      },
      {
        id: 113,
        type: "mcq",
        title: "选择 数组 还是 对象",
        content: "下列数据更适合用哪种表示？（可多选）\n【提示】列清单用 数组，填表单用 对象。",
        options: [
          "一个班的同学名字清单",
          "一本书的信息：书名、作者、定价",
          "购物车里的商品队列",
          "个人资料：姓名、年龄、是否 VIP",
        ],
        hint: "清单→数组；资料卡→对象。",
        solution: "1 和 3 用 数组；2 和 4 用 对象。口诀：列清单用 数组，填表单用 对象。",
        correct: [0, 2],
        multiple: true,
      },
      {
        id: 116,
        type: "mcq",
        title: "选择文本还是数字",
        content: "下面哪些更适合用数字存？哪些更适合用字符串存？（可多选，选“数字更合适”的项）",
        options: ["年龄 12", '电话号码 "13800138000"', "价格 9.9", '邮编 "100000"'],
        hint: "会做加减比较的→数字；只当作标识/不会算术→字符串。",
        solution: "年龄、价格适合数字；电话号码、邮编适合字符串（避免前导 0 丢失且不会做加减）。",
        correct: [0, 2],
        multiple: true,
      },
      {
        id: 104,
        type: "mcq",
        title: "什么时候应引入变量？",
        content: "选择更适合使用变量的情况（可多选）。",
        options: [
          "一个值只打印一次，之后再也不用",
          "反复用到某个值，且后续可能变化",
          "给一个复杂表达式命名，提升可读性",
          "需要把中间结果传给后续多个步骤",
        ],
        hint: "可复用、会变化、需要命名/传递的值，都适合抽成变量。",
        solution: "选 2、3、4",
        correct: [1, 2, 3],
        multiple: true,
      },
      {
        id: 112,
        type: "mcq",
        title: "哪些场景更适合用 const？（可多选）",
        content: "从下列选出“更应该用 const”的场景（可多选）",
        options: [
          "保存不会被重新赋值的配置对象",
          "循环中计数 i 需要自增",
          "一个列表在后续需要 push 新项（但变量名不变）",
          "保存今天的日期字符串，不会改变",
        ],
        hint: "不重新赋值用 const；需要重新赋值（如 i++）用 let。对象/数组内部内容可改但变量绑定不变仍可 const。",
        solution: "1、3、4 用 const；2 用 let",
        correct: [0, 2, 3],
        multiple: true,
      },
      {
        id: 114,
        type: "text",
        title: "我会取元素/属性了",
        content: '已知 const scores=[95,88,76] 与 const me={name:"Lily", age:11}，请输出第一个分数与名字。',
        hint: "scores[0] 取第一个；me.name 取名字。",
        solution:
          'const scores=[95,88,76]; const me={name:"Lily", age:11}; console.log(scores[0]); console.log(me.name)',
        validatorRegex:
          "scores\\s*=\\s*\\[\\s*95\\s*,\\s*88\\s*,\\s*76\\s*\\][\\s\\S]*me\\s*=\\s*\\{[\\s\\S]*name[\\s\\S]*11[\\s\\S]*\\}[\\s\\S]*console\\.log\\s*\\(\\s*scores\\s*\\[\\s*0\\s*\\]\\s*\\)[\\s\\S]*console\\.log\\s*\\(\\s*me\\.name\\s*\\)",
      },
    ],
  },
  {
    day: 2,
    title: '运算符：让数据"动起来"（计算、比较、判断）',
    intro: `
      <p>程序本质：输入 → 处理 → 输出。</p>
      <p>昨天我们学会了"装数据"，今天学习"让数据动起来"——用运算符进行计算、比较、判断。</p>
      
      <p><b>运算符就像"计算器"</b>：</p>
      <ul>
        <li><b>算术运算</b>：像计算器一样做数学题
          <div>示例：<code>加号+ 减号- 乘号* 除号/ 取余号%</code> 就像 <code>3 + 5 = 8</code>、<code>10 / 2 = 5</code></div>
          <div>用途：价格计算、数量统计、百分比等</div>
        </li>
        <li><b>比较运算</b>：像"比大小"游戏
          <div><code>> < >= <= == ===</code></div>
          <div>== 和 === 的区别：== 是宽松比较，只比较内容是否相同，不检查类型，=== 是严格比较，除了检查内容是否相同还检查类型是否相同</div>
          <div>示例：<code>5 > 3</code> 结果是 <code>true</code></div>
          <div>用途：判断条件、筛选数据、做决定</div>
        </li>
        <li><b>逻辑运算</b>：把多个条件组合起来，判断是否满足条件
          <div>示例：<code>&& || !</code></div>
          <div>具体例子：</div>
          <ul>
            <li><code>&&</code>（与：必须所有条件都满足，结果才为真）：<code>age >= 18 && isBoy</code> 表示"年龄≥18岁 并且 是男孩"</li>
            <li><code>||</code>（或：只要有一个条件满足，结果就为真）：<code>isStudent || isTeacher</code> 表示"是学生 或者 是老师"</li>
            <li><code>!</code>（非：取反，结果为真变为假，结果为假变为真）：<code>!isBoy</code> 表示"不是男孩"</li>
          </ul>
          <div>用途：复杂条件判断、多重筛选</div>
        </li>
        <li><b>赋值运算</b>：把计算结果存到变量里
          <div>示例：<code>= += -= *= /=</code></div>
          <div>具体例子：</div>
          <ul>
            <li><code>=</code>（赋值）：<code>age = 18</code> 表示"把18存到age变量里"</li>
            <li><code>+=</code>（加后赋值）：<code>score += 10</code> 表示"score = score + 10"</li>
            <li><code>*=</code>（乘后赋值）：<code>price *= 2</code> 表示"price = price * 2"</li>
          </ul>
          <div>用途：保存计算结果、更新变量值</div>
        </li>
      </ul>

      <p><b>为什么需要优先级？</b></p>
      <p>就像数学里的"先乘除后加减"，编程也有运算顺序。但为了避免混乱，<b>建议总是加括号</b>，让代码意图更清晰。</p>
      
      <p><b>生活场景：超市收银系统</b></p>
      <pre>需求：计算商品总价，满100减20
思路：
1) 计算商品总价：单价 × 数量
2) 判断是否满减：商品总价 ≥ 100？
3) 计算实付：如果“满减”就把总价减20，否则就按原价支付

代码实现：
const price = 45;        // 单价45元
const qty = 3;           // 买3件
const total = (price * qty);  // 商品总价 = 45 × 3 = 135
const isDiscount = (total >= 100);  // 是否满减？135 ≥ 100 = true
const pay = (isDiscount ? (total - 20) : total);  // 实付 = 135 - 20 = 115
console.log("实付金额：", pay, "元");  // 输出：实付金额：115 元</pre>

      <p><b>编程思维：如何用运算表达逻辑？</b></p>
      <ul>
        <li><b>分解问题</b>：把复杂计算拆成简单步骤</li>
        <li><b>选择运算符</b>：每个步骤用什么运算？</li>
        <li><b>明确优先级</b>：用括号确保运算顺序正确</li>
        <li><b>验证结果</b>：用不同数据测试是否正确</li>
      </ul>

      <p><b>实际示例：学生成绩管理</b></p>
      <pre>需求：判断学生是否能获得奖学金
条件：数学≥90分 并且 语文≥85分 并且 英语≥80分

编程思维应用：
1) 分解问题：需要检查3个科目的分数
2) 选择运算符：用 >= 比较分数，用 && 连接条件
3) 明确优先级：用括号确保逻辑清晰
4) 验证结果：用不同分数测试

代码实现：
const math = 95;        // 数学95分
const chinese = 88;     // 语文88分  
const english = 82;     // 英语82分
const canGetScholarship = (math >= 90) && (chinese >= 85) && (english >= 80);
console.log("能否获得奖学金：", canGetScholarship);  // true

验证：数学95≥90✓，语文88≥85✓，英语82≥80✓，所以能获得奖学金</pre>

      <p><b>实际示例：购物优惠判断</b></p>
      <pre>需求：VIP用户 或者 满200元 可以免运费

编程思维应用：
1) 分解问题：检查用户身份 或 订单金额
2) 选择运算符：用 || 表示"或者"关系
3) 明确优先级：用括号确保逻辑清晰
4) 验证结果：测试VIP和普通用户两种情况

代码实现：
const isVip = true;           // 是VIP用户
const orderAmount = 150;      // 订单150元
const freeShipping = isVip || (orderAmount >= 200);
console.log("是否免运费：", freeShipping);  // true（因为是VIP）

验证：VIP用户直接免运费，不需要满200元</pre>
    `,
    questions: [
      {
        id: 201,
        type: "mcq",
        title: "运算符分类理解",
        content: "下列场景使用的运算符正确吗？（可多选）",
        options: [
          "计算购物车总价：单价 × 数量 → 算术运算符",
          "判断用户是否成年：年龄 ≥ 18 → 比较运算符",
          "检查登录状态：用户名存在 && 密码正确 → 逻辑运算符",
          "更新用户积分：积分 = 积分 + 10 → 赋值运算符",
        ],
        hint: "算术做计算，比较做判断，逻辑做组合，赋值做存储。",
        solution: "全部正确：1用算术，2用比较，3用逻辑，4用赋值",
        correct: [0, 1, 2, 3],
        multiple: true,
      },
      {
        id: 202,
        type: "mcq",
        title: "括号位置影响逻辑含义",
        content:
          "下面两个表达式的逻辑含义相同吗？<br/>A: (age >= 18 && isStudent) || hasVipCard<br/>B: age >= 18 && (isStudent || hasVipCard)",
        options: [
          '相同：都是"年龄≥18 并且 是学生 或者 有VIP卡"',
          '不同：A是"(年龄≥18 并且 是学生) 或者 有VIP卡"，B是"年龄≥18 并且 (是学生 或者 有VIP卡)"',
          "A表示：成年人学生 或 任何VIP用户都可以",
          "B表示：成年人 且 (是学生 或 VIP用户)",
        ],
        hint: '括号位置不同，逻辑关系完全不同。A是"或"关系，B是"且"关系。',
        solution: "2、3、4都正确。A和B的逻辑含义完全不同，括号位置很重要！",
        correct: [1, 2, 3],
        multiple: true,
      },
      {
        id: 203,
        type: "mcq",
        title: "比较运算的选择",
        content: "下列比较中，哪些结果是 true？（可多选）",
        options: ["5 > 3", '"5" == 5', '"5" === 5', "10 >= 10"],
        hint: "== 会转换类型，=== 严格比较类型。>= 包含等于。",
        solution: '1、2、4为true。=== 严格比较，"5"和5类型不同。',
        correct: [0, 1, 3],
        multiple: true,
      },
      {
        id: 204,
        type: "mcq",
        title: "逻辑运算的思考",
        content: "学校规定：成绩≥80 AND 出勤率≥90% 才能评优。用逻辑运算表达这个条件。",
        options: [
          "score >= 80 && attendance >= 90",
          "score >= 80 || attendance >= 90",
          "score > 80 && attendance > 90",
          "score >= 80 && attendance > 90",
        ],
        hint: "AND用&&，两个条件都要满足。≥80包含80分。",
        solution: "选1。两个条件都要满足，用&&。≥80包含80分。",
        correct: [0],
        multiple: false,
      },
      {
        id: 206,
        type: "mcq",
        title: "运算符优先级的重要性",
        content: "为什么在编程中要重视运算符优先级？",
        options: ["让代码运行更快", "避免计算结果错误", "让代码更容易阅读", "减少代码行数"],
        hint: "优先级影响运算顺序，错误的顺序会导致错误的结果。",
        solution: "选2和3。优先级确保计算正确，括号让代码更易读。",
        correct: [1, 2],
        multiple: true,
      },
    ],
  },
  {
    day: 3,
    title: "条件分支：if / 三元 / switch",
    intro: `
      <p><code>if/else</code>：灵活，适合范围与复杂条件。</p>
      <p>三元：在表达式内就地赋值，简洁但不要嵌套。</p>
      <p><code>switch</code>：等值枚举更清晰，便于对齐分支。</p>
    `,
    questions: [
      {
        id: 301,
        type: "mcq",
        title: "选择合适的条件结构",
        content: "根据 day（1~7）输出“星期一~星期日”，哪种更合适？",
        options: [
          "一串 if/else if 判断 day === 1, day === 2, ...",
          "一个 switch(day) 按不同 case 输出",
          "用三元表达式把所有情况嵌套起来",
        ],
        hint: "等值枚举更适合 switch；三元嵌套可读性差。",
        solution: "switch 更清晰",
        correct: [1],
      },
      {
        id: 302,
        type: "text",
        title: "三种结构改写",
        content: "把 if/else if/else 的“分数等级”逻辑改写为 switch（区间可先转等级标识再 switch）。",
        hint: "先把分数映射到等级 A/B/C/D，再 switch(level)。",
        solution: '先通过 if 得到 level="A|B|C|D"，再 switch(level){case "A":...}',
        validatorRegex: "switch\\s*\\(\\s*level\\s*\\)",
      },
    ],
  },
  {
    day: 4,
    title: "循环与数组：何时用 for，何时用 while",
    intro: `
      <p><b>for</b>：已知次数/有明确下标范围；需要索引或步长控制。</p>
      <p><b>while</b>：未知次数/等待条件发生（直到成功、直到队列空）。</p>
      <p>避免无限循环：确保状态变化 + 出口条件；必要时加“计数上限”保护并打印日志。</p>
    `,
    questions: [
      {
        id: 401,
        type: "mcq",
        title: "何时用 for 或 while？",
        content: "下列需求更适合用哪种循环？（可多选）",
        options: [
          "遍历一个长度已知的数组，逐项相加",
          "反复请求接口直到返回成功或超过 3 次",
          "从队列中不停取任务直到队列为空",
          "生成从 0 到 100 的偶数序列",
        ],
        hint: "已知次数/有下标→for；未知次数/等条件→while。",
        solution: "1 和 4 用 for；2 和 3 用 while（2 也可 for 限制 3 次，但语义更像 while+退出）。",
        correct: [0, 1, 2, 3],
        multiple: true,
      },
      {
        id: 402,
        type: "text",
        title: "for 改写 while",
        content: "把以下 while 改写成等价的 for：\nlet i = 0; while(i < 5){ console.log(i); i++; }",
        hint: "for(初始化; 条件; 递增){...}",
        solution: "for(let i = 0; i < 5; i++){ console.log(i); }",
        validatorRegex:
          "^\\s*for\\s*\\(\\s*let\\s+i\\s*=\\s*0\\s*;\\s*i\\s*<\\s*5\\s*;\\s*i\\s*\\+\\+\\s*\\)\\s*\\{[\\s\\S]*console\\.log\\s*\\(\\s*i\\s*\\)[\\s\\S]*\\}\\s*$",
      },
      {
        id: 403,
        type: "text",
        title: "求数组和（for-of）",
        content: "用 for-of 计算数组 [1,2,3,4] 的和并输出结果。",
        hint: "let sum=0; for(const x of arr){ sum+=x }",
        solution: "const arr=[1,2,3,4]; let sum=0; for(const x of arr){ sum+=x } console.log(sum)",
        validatorRegex: "for\\s*\\(\\s*const\\s+\\w+\\s+of\\s+\\[\\s*1\\s*,\\s*2\\s*,\\s*3\\s*,\\s*4\\s*\\]\\s*\\)",
      },
      {
        id: 404,
        type: "mcq",
        title: "避免无限循环的做法",
        content: "哪些做法有助于避免或定位无限循环？",
        options: [
          "确保循环体中有状态变化（接近退出条件）",
          "在条件难判断时，增加计数上限保护并在达上限时 break",
          "在循环内加入关键日志（如当前计数/关键变量）",
          "把退出条件写成恒真表达式，这样更简单",
        ],
        hint: "防御性编程：状态变化、上限保护、日志。",
        solution: "选 1、2、3",
        correct: [0, 1, 2],
        multiple: true,
      },
    ],
  },
  {
    day: 5,
    title: "函数的作用：封装、复用、抽象、可测试",
    intro: `
      <p>为什么要有函数？</p>
      <ul>
        <li>封装：隐藏实现细节；</li>
        <li>复用：不重复写同样逻辑；</li>
        <li>命名抽象：提升可读性；</li>
        <li>可测试：输入→输出可验证。</li>
      </ul>
    `,
    questions: [
      {
        id: 501,
        type: "text",
        title: "提炼函数（封装与复用）",
        content:
          '把以下重复打印价格的代码提炼成函数 printPrice(price){...} 并调用两次。\nconst p1 = 19.9; console.log("价格:", p1 + "元"); const p2 = 29; console.log("价格:", p2 + "元");',
        hint: '把 console.log("价格:", x + "元") 封装为函数并复用。',
        solution: 'function printPrice(p){ console.log("价格:", p + "元"); } printPrice(19.9); printPrice(29);',
        validatorRegex: "function\\s+printPrice\\s*\\(\\s*p\\s*\\)\\s*\\{[\\s\\S]*?\\}\\s*printPrice\\s*\\(",
      },
      {
        id: 502,
        type: "mcq",
        title: "什么是纯函数",
        content: "下列哪个更符合“纯函数”？",
        options: ["读取外部变量并修改它", "只依赖输入参数并返回新值，不修改外部状态", "在函数内把全局配置改掉"],
        hint: "纯函数=可预测、无副作用。",
        solution: "选 2",
        correct: [1],
      },
    ],
  },
  {
    day: 6,
    title: "对象与解构，值/引用与浅拷贝",
    intro: `
      <p>对象用来组织具名数据；解构/展开让代码更简洁。</p>
      <p>引用语义：对象/数组赋值的是“引用”；用 <code>{...obj}</code> 可以做浅拷贝。</p>
    `,
    questions: [
      {
        id: 601,
        type: "text",
        title: "解构与默认值",
        content: '从对象 {name:"Tom", age:18} 解构出 name，并给 city 设默认值 "Beijing"。',
        hint: 'const { name, city = "Beijing" } = obj',
        solution: 'const obj = {name:"Tom", age:18}; const { name, city = "Beijing" } = obj',
        validatorRegex: "\\{\\s*name\\s*,\\s*city\\s*=\\s*[\"']Beijing[\"']\\s*\\}\\s*=\\s*obj",
      },
      {
        id: 602,
        type: "mcq",
        title: "避免原数据被改动",
        content: "合并配置且避免修改原对象，选择正确写法。",
        options: [
          "const c = Object.assign(base, extra)",
          "const c = { ...base, ...extra }",
          'base.theme = "dark"; const c = base',
        ],
        hint: "不要改动输入对象；使用新对象返回。",
        solution: "选 2",
        correct: [1],
      },
    ],
  },
  {
    day: 7,
    title: "小项目方法论 + fetch 第三方API（天气）",
    intro: `
      <p><b>项目需求（示例：词频统计 + 天气展示）</b></p>
      <ol>
        <li>输入：一段文本；输出：按词出现次数排序的列表（去空词、大小写统一）。</li>
        <li>扩展：点击按钮获取某城市天气（<code>fetch</code> 调用 wttr.in，无需密钥）。</li>
      </ol>
      <p><b>通用方法：</b>明确输入/输出 → 分解步骤 → 小步验证 → 打日志调试。</p>
      <button id="runWordCount">示例：统计这段文本</button>
      <pre id="wcOut"></pre>
      <button id="demoWeather">示例：北京天气</button>
      <pre id="weatherOut"></pre>
    `,
    questions: [
      {
        id: 701,
        type: "text",
        title: "编写 fetch 获取天气（城市→天气）",
        content:
          '写一个函数 getWeather(city) 使用 fetch 获取指定城市的天气并返回字符串，如 "25°C, Sunny"。可用 wttr.in JSON： https://wttr.in/{city}?format=j1',
        hint: "注意 encodeURIComponent、await res.json()、错误处理。",
        solution: `async function getWeather(city){
  const url = \`https://wttr.in/\${encodeURIComponent(city)}?format=j1\`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('网络错误');
  const data = await res.json();
  const cur = data.current_condition && data.current_condition[0];
  return \`\${cur.temp_C}°C, \${(cur.weatherDesc?.[0]?.value)||''}\`;
}`,
        validatorRegex: "fetch\\s*\\(\\s*`?https?://wttr\\.in/\\$?\\{?encodeURIComponent\\(",
      },
      {
        id: 702,
        type: "mcq",
        title: "分解步骤的顺序",
        content: "做一个“词频统计”的合理步骤是？",
        options: [
          "先写 UI，再决定输入输出格式",
          "先明确输入/输出与边界，再分解步骤并各自验证",
          "先实现排序，最后再考虑如何统计",
          "每步都可单独验证（小步测试）",
        ],
        hint: "先目标与边界，再分解；每步可验证。",
        solution: "选 2、4",
        correct: [1, 3],
        multiple: true,
      },
      {
        id: 703,
        type: "text",
        title: "实现纯函数 wordCount(text)",
        content: "写函数 wordCount(text) 返回 { word: count }。忽略大小写，过滤空字符串。",
        hint: "text.toLowerCase().split(/\\W+/).filter(Boolean)",
        solution: `function wordCount(text){
  const m = {};
  for(const w of text.toLowerCase().split(/\\W+/).filter(Boolean)){
    m[w] = (m[w]||0)+1;
  }
  return m;
}`,
        validatorRegex:
          "function\\s+wordCount\\s*\\(\\s*text\\s*\\)[\\s\\S]*split\\s*\\(\\s*/\\\\W\\+/(\\s*)\\)[\\s\\S]*return|function\\s+wordCount",
      },
      {
        id: 704,
        type: "text",
        title: "排序输出 Top N",
        content: "基于 wordCount 的结果对象，输出出现次数最高的前 3 个单词（字符串）。",
        hint: "Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,3)",
        solution: `function top3(m){
  return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([w,c])=>w+':'+c).join(', ');
}`,
        validatorRegex: "Object\\.entries\\s*\\(\\s*\\w+\\s*\\)\\s*\\.sort\\s*\\(",
      },
      {
        id: 705,
        type: "mcq",
        title: "测试与调试的实践",
        content: "哪些做法能提升小项目的正确性与可维护性？",
        options: [
          "为核心函数准备 2-3 个最小用例（输入→期望输出）",
          "用 console.log 打印关键中间结果以核对思路",
          "发现 bug 时一次性重写全部代码",
          "为容易出错的步骤（如排序）写断言类检查",
        ],
        hint: "小步验证、聚焦问题、对关键步骤加检查。",
        solution: "选 1、2、4",
        correct: [0, 1, 3],
        multiple: true,
      },
    ],
  },
];
