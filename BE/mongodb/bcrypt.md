# 使用mongoose和bcrypt实现用户密码加密 

&emsp;&emsp;最近在做的个人项目中，需要对密码进行加密保存，对该操作的详细步骤记录如下

&nbsp;

### 介绍

&emsp;&emsp;关于mongoose已经写过博客就不再赘述，下面主要介绍bcrypt

&emsp;&emsp;bcrypt是一个由两个外国人根据Blowfish加密算法所设计的密码散列函数。实现中bcrypt会使用一个加盐的流程以防御彩虹表攻击，同时bcrypt还是适应性函数，它可以借由增加迭代之次数来抵御暴力破解法

&emsp;&emsp;使用npm安装即可
```
npm install --save bcrypt
```

&nbsp;

### 用户模型

&emsp;&emsp;下面来创建代码用户user的schema，用户名不能重复

```
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
```
 

&nbsp;

### 加密
&emsp;&emsp;下面加入用户模型的是Mongoose的中间件，该中间件使用pre前置钩子，在密码保存之前，自动地把密码变成hash。详细代码如下

```
let SALT_WORK_FACTOR = 5
UserSchema.pre('save', function(next) {
    var user = this;

    //产生密码hash当密码有更改的时候(或者是新密码)
    if (!user.isModified('password')) return next();

    // 产生一个salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        //  结合salt产生新的hash
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // 使用hash覆盖明文密码
            user.password = hash;
            next();
        });
    });
});
```
&emsp;&emsp;在node.bcrypt.js中SALT_WORK_FACTOR默认使用的是10，这里设置为5

 

&nbsp;

### 验证

&emsp;&emsp;加密之后，密码原文被替换为密文了。我们无法解密，只能通过bcrypt的compare方法，对再次传入的密码和数据库中保存的加密后的密码进行比较，如果匹配，则登录成功

```
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
```
&emsp;&emsp;把上面的几个步骤串在一起，完整代码如下

```
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 5;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
```
 

&nbsp;

### 测试

&emsp;&emsp;把上面的代码保存成user-model.js，然后运行下面代码来实际测试

```
var mongoose = require('mongoose'),
    User = require('./user-model');

var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    username: 'jmar777',
    password: 'Password123'
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

    // fetch user and test password verification
    User.findOne({ username: 'jmar777' }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('Password123', function(err, isMatch) {
            if (err) throw err;
            console.log('Password123:', isMatch); // -> Password123: true
        });

        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -> 123Password: false
        });
    });
});
```
&emsp;&emsp;控制台中输入如下数据：

![bcrypt1](https://pic.xiaohuochai.site/blog/bcrypt1.png)

&emsp;&emsp;数据库数据如下：

![bcrypt2](https://pic.xiaohuochai.site/blog/bcrypt2.png)

