## 继承

每个类有三部分组成

- 构造函数内的，供实例化对象复制用
- 构造函数外的，点语法添加，供类使用
- 类的原型中，实例化对象通过原型链访问

### 1. 原型链继承

子类的prototype为父类的实例

 why: 类的原型对象作用是为类的原型添加公有方法，类不能直接访问，必须通过prototype访问。

我们实例化父类时，新建的对象复制了父类构造函数的属性方法，并且通过原型访问到了父类原型上的属性方法。

把这个新建的对象赋值给子类的原型，那么子类原型就能访问父类的原型属性和方法，和父类构造器中的属性和方法。

缺点：

父类的公有属性如果是引用类型，子类的一个实例更改了父类的该属性，另一个子类的实例也会受到影响。如下。

实例化父类时无法对父类构造函数内的属性初始化。

```js
function F () {
  this.books = ['js', 'html', 'css']
}
function C () {}
C.prototype = new F()
var o1 = new C()
var o2 = new C()
o2.books   // ['js', 'html', 'css']
o1.books.push('added')
o2.books   // ['js', 'html', 'css', 'added']
```

### 2. 构造函数式继承 

F.call(this, id)是构造函数式继承的精华。

call可以改变函数的作用环境，在子类中，对F调用call就是将子类的变量在父类中执行了一遍。

由于父类中给this绑定属性，因此子类就继承了父类的公有属性。

缺点：没有涉及原型，因此父类的原型方法不会被继承。

```js
function F (id) {
  this.books = ['js', 'html', 'css']
  this.id = id
}
F.prototype.showBooks = function () { console.log(this.books) }
function C (id) {
  F.call(this, id)
}

var o1 = new C(0)
var o2 = new C(1)
o1.books.push('added')
o1.id     // 0
o1.books  // ['js', 'html', 'css', 'added']
o2.id     // 1
o2.books  // ['js', 'html', 'css']
```

### 3. 组合式继承 

原型链继承+构造函数继承

缺点：父类构造函数调用了两次：构造函数式继承时、类式继承时

```js
function F (name) {
  this.name = name
  this.books = ['js', 'html', 'css']
}
F.prototype.getName = function () { console.log(this.name) }
function C (name, time) {
  F.call(this, name)
  this.time = time
}
C.prototype = new F()
C.prototype.getTime = function () { console.log(this.time) }
```

### 4. 原型式继承 

过渡函数对象相当于类式继承中的子类，目的是为了创建要返回的新的实例化对象。

随着对这种思想的深入，后来出现了Object.create()。

缺点同样是父类对象中引用类型的属性被共用。

```js
function inheritObject (o) {
  // 过渡函数对象
  function F () {}
  F.prototype = o
  return new F()
}
```

### 5. 寄生式继承

对原型继承的二次封装，并且在此过程中对继承的对象进行了扩展。

这样创建的对象不仅仅有父类中的属性和方法，还添加了新的属性和方法。

```js
function createBook (o) {
  var obj = new inheritObject(o)
  obj.getName = function () { console.log(name) }
  return obj
}
```

### 6. 寄生组合式继承

寄生组合式继承（寄生、构造函数）

C 子类

F 父类

```js
function inheritPrototype (C, F) {
  var p = inheritObject(F.prototype)
  p.constructor = C
  C.prototype = p
}
```

组合式继承中，通过构造函数继承的属性和方法是没有问题的，所以需要通过寄生继承父类的原型。

我们需要的只是父类的原型，不需要父类的构造函数，因此拿到父类的原型副本即可。

父类原型副本通过原型继承可以拿到，但是复制给p之后，p中的constructor指向的不是C子类对象。

因此需要修复p的constructor为C,即p.constructor = C。

然后将副本复制给C的原型，这样子类的原型就继承了父类的原型，并且没有执行父类的构造函数。

```js
// 定义父类
function F (name) {
  this.name = name
  this.books = ['js', 'html', 'css']
}
// 父类原型方法
F.prototype.getName = function () { console.log(this.naem) }
// 定义子类
function C (name, time) {
  F.call(this, name)
  this.time = time
}
// 寄生式继承父类原型
inheritPrototype(C, F)
// 子类新增原型方法
C.prototype.getTime = function () { console.log(this.time) }

var o1 = new C('o1', 'time1')
var o2 = new C('o2', 'time2')

o1.books.push('im new')
o1.books    // ["js", "html", "css", "im new"]
o2.books    // ["js", "html", "css"]
o2.getName  // 'o2'
o2.getTime  // 'time2'
```



## ES6对象与继承

```js
// 定义类
class Student {
    // 构造方法
    constructor(name, age, subject) {
        this.name = name;
        this.age = age;
        this.subject = subject;
	}
    
    study() {
        console.log(`我在学习${this.subject}`)
    }
}
//实例化类
let student = new Student('kk', 24, '前端开发');
student.study(); //我在学习前端开发
```

上面的代码定义了一个 `Student`类， 可以看到里面有一个 `constructor`方法， 这就是构造方法，而 `this`关键字则代表实例对象。也就是说，ES5中的构造函数 `Student`， 对应的是E6中 `Student`类中的 `constructor`方法。

`Student`类除了构造函数方法，还定义了一个 `study`方法。需要特别注意的是，在ES6中定义类中的方法的时候，前面不需要加上 `function`关键字，直接把函数定义进去就可以了。另外，方法之间不要用逗号分隔，加了会报错。而且，类中的方法全部是定义在原型上的，我们可以用下面的代码进行验证。

```
console.log(student3.__proto__.study === Student.prototype.study); //trueconsole.log(student3.hasOwnProperty('study')); // false
```

上面的第一行的代码中, `student3.__proto__`是指向的原型对象，其中 `Student.prototype`也是指向的原型的对象，结果为 `true`就能很好的说明上面的结论： **类中的方法全部是定义在原型上的**。第二行代码是验证 `student3`实例中是否有 `study`方法，结果为 `false`， 表明实例中没有 `study`方法，这也更好的说明了上面的结论。

### 继承

E6中 `class`可以通过 `extends`关键字来实现继承， 这比前面提到的ES5中使用原型链来实现继承， 要清晰和方便很多。下面我们使用ES6的语法来实现 `Pupil`。

```js
//子类
class Pupil extends Student{
    constructor(name, age, subject, school) {    
        //调用父类的constructor    
        super(name, age, subject);     
        this.school = school;  
    }
}
let pupil = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');
pupil.study(); //我在学习小学义务教育课程
```

上面代码代码中， 我们通过了 `extends`实现 `Pupil`子类继承 `Student`父类。需要特别注意的是，子类必须在 `constructor`方法中**首先调用 super方法**，否则实例化时会报错。这是因为子类没有自己的 `this`对象， 而是继承父类的 `this`对象，然后对其加工。如果不调用 `super`方法，子类就得不到 `this`对象。