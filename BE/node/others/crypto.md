# 加密crypto

　　加密模块提供了 HTTP 或 HTTPS 连接过程中封装安全凭证的方法。也提供了 OpenSSL 的哈希，hmac, 加密（cipher）, 解密（decipher）, 签名（sign） 和 验证（verify） 方法的封装。本文将详细介绍加密crypto

&nbsp;

### crypto

【crypto.setEngine(engine[, flags])】

　　为某些/所有 OpenSSL 函数加载并设置引擎（根据参数 flags 来设置）。

　　engine 可能是 id，或者是指向引擎共享库的路径。

　　flags是可选参数，默认值是ENGINE_METHOD_ALL ，可以是以下一个或多个参数的组合(在constants里定义)

<div class="cnblogs_code">
<pre>ENGINE_METHOD_RSA
ENGINE_METHOD_DSA
ENGINE_METHOD_DH
ENGINE_METHOD_RAND
ENGINE_METHOD_ECDH
ENGINE_METHOD_ECDSA
ENGINE_METHOD_CIPHERS
ENGINE_METHOD_DIGESTS
ENGINE_METHOD_STORE
ENGINE_METHOD_PKEY_METH
ENGINE_METHOD_PKEY_ASN1_METH
ENGINE_METHOD_ALL
ENGINE_METHOD_NONE</pre>
</div>

【crypto.getCiphers()】

　　返回支持的加密算法名数组

<div class="cnblogs_code">
<pre>var crypto = require('crypto');
console.log(crypto.getCiphers());
//[ 'aes-128-cbc',  'aes-128-ccm',  'aes-128-cfb',  'aes-128-cfb1',  'aes-128-cfb8',  'aes-128-ctr',  'aes-128-ecb',  'aes-128-gcm',  'aes-128-ofb',  'aes-128-xts',  'aes-192-cbc',  'aes-192-ccm',  'aes-192-cfb',  'aes-192-cfb1',  'aes-192-cfb8',  'aes-192-ctr',  'aes-192-ecb',  'aes-192-gcm',  'aes-192-ofb',  'aes-256-cbc',  'aes-256-ccm',  'aes-256-cfb',  'aes-256-cfb1',  'aes-256-cfb8',  'aes-256-ctr',  'aes-256-ecb',  'aes-256-gcm',  'aes-256-ofb',  'aes-256-xts',  'aes128',  'aes192',  'aes256',  'bf',  'bf-cbc',  'bf-cfb',  'bf-ecb',  'bf-ofb',  'blowfish',  'camellia-128-cbc',  'camellia-128-cfb',  'camellia-128-cfb1',  'camellia-128-cfb8',  'camellia-128-ecb',  'camellia-128-ofb',  'camellia-192-cbc',  'camellia-192-cfb',  'camellia-192-cfb1',  'camellia-192-cfb8',  'camellia-192-ecb',  'camellia-192-ofb',  'camellia-256-cbc',  'camellia-256-cfb',  'camellia-256-cfb1',  'camellia-256-cfb8',  'camellia-256-ecb',  'camellia-256-ofb',  'camellia128',  'camellia192',  'camellia256',  'cast',  'cast-cbc',  'cast5-cbc',  'cast5-cfb',  'cast5-ecb',  'cast5-ofb',  'des',  'des-cbc',  'des-cfb',  'des-cfb1',  'des-cfb8',  'des-ecb',  'des-ede',  'des-ede-cbc',  'des-ede-cfb',  'des-ede-ofb',  'des-ede3',  'des-ede3-cbc',  'des-ede3-cfb',  'des-ede3-cfb1',  'des-ede3-cfb8',  'des-ede3-ofb',  'des-ofb',  'des3',  'desx',  'desx-cbc',  'id-aes128-CCM',  'id-aes128-GCM',  'id-aes128-wrap',  'id-aes192-CCM',  'id-aes192-GCM',  'id-aes192-wrap',  'id-aes256-CCM',  'id-aes256-GCM',  'id-aes256-wrap',  'id-smime-alg-CMS3DESwrap',  'idea',  'idea-cbc',  'idea-cfb',  'idea-ecb',  'idea-ofb',  ... 15 more items ]
</pre>
</div>

【crypto.getCiphers()】

　　返回支持的哈希算法名数组。

<div class="cnblogs_code">
<pre>var crypto = require('crypto');
console.log(crypto.getHashes());
//[ 'DSA',  'DSA-SHA',  'DSA-SHA1',  'DSA-SHA1-old',  'RSA-MD4',  'RSA-MD5',  'RSA-MDC2',  'RSA-RIPEMD160',  'RSA-SHA',  'RSA-SHA1',  'RSA-SHA1-2',  'RSA-SHA224',  'RSA-SHA256',  'RSA-SHA384',  'RSA-SHA512',  'dsaEncryption',  'dsaWithSHA',  'dsaWithSHA1',  'dss1',  'ecdsa-with-SHA1',  'md4',  'md4WithRSAEncryption',  'md5',  'md5WithRSAEncryption',  'mdc2',  'mdc2WithRSA',  'ripemd',  'ripemd160',  'ripemd160WithRSA',  'rmd160',  'sha',  'sha1',  'sha1WithRSAEncryption',  'sha224',  'sha224WithRSAEncryption',  'sha256',  'sha256WithRSAEncryption',  'sha384',  'sha384WithRSAEncryption',  'sha512',  'sha512WithRSAEncryption',  'shaWithRSAEncryption',  'ssl2-md5',  'ssl3-md5',  'ssl3-sha1',  'whirlpool' ]</pre>
</div>

【crypto.getCurves()】

　　返回支持的椭圆曲线名数组。

<div class="cnblogs_code">
<pre>var crypto = require('crypto');
console.log(crypto.getCurves());
//[ 'Oakley-EC2N-3',  'Oakley-EC2N-4',  'brainpoolP160r1',  'brainpoolP160t1',  'brainpoolP192r1',  'brainpoolP192t1',  'brainpoolP224r1',  'brainpoolP224t1',  'brainpoolP256r1',  'brainpoolP256t1',  'brainpoolP320r1',  'brainpoolP320t1',  'brainpoolP384r1',  'brainpoolP384t1',  'brainpoolP512r1',  'brainpoolP512t1',  'c2pnb163v1',  'c2pnb163v2',  'c2pnb163v3',  'c2pnb176v1',  'c2pnb208w1',  'c2pnb272w1',  'c2pnb304w1',  'c2pnb368w1',  'c2tnb191v1',  'c2tnb191v2',  'c2tnb191v3',  'c2tnb239v1',  'c2tnb239v2',  'c2tnb239v3',  'c2tnb359v1',  'c2tnb431r1',  'prime192v1',  'prime192v2',  'prime192v3',  'prime239v1',  'prime239v2',  'prime239v3',  'prime256v1',  'secp112r1',  'secp112r2',  'secp128r1',  'secp128r2',  'secp160k1',  'secp160r1',  'secp160r2',  'secp192k1',  'secp224k1',  'secp224r1',  'secp256k1',  'secp384r1',  'secp521r1',  'sect113r1',  'sect113r2',  'sect131r1',  'sect131r2',  'sect163k1',  'sect163r1',  'sect163r2',  'sect193r1',  'sect193r2',  'sect233k1',  'sect233r1',  'sect239k1',  'sect283k1',  'sect283r1',  'sect409k1',  'sect409r1',  'sect571k1',  'sect571r1',  'wap-wsg-idm-ecid-wtls1',  'wap-wsg-idm-ecid-wtls10',  'wap-wsg-idm-ecid-wtls11',  'wap-wsg-idm-ecid-wtls12',  'wap-wsg-idm-ecid-wtls3',  'wap-wsg-idm-ecid-wtls4',  'wap-wsg-idm-ecid-wtls5',  'wap-wsg-idm-ecid-wtls6',  'wap-wsg-idm-ecid-wtls7',  'wap-wsg-idm-ecid-wtls8',  'wap-wsg-idm-ecid-wtls9' ]</pre>
</div>

&nbsp;

### MD5

　　MD5是一种常用的哈希算法，用于给任意数据一个&ldquo;签名&rdquo;。这个签名通常用一个十六进制的字符串表示：

【crypto.createHash(algorithm)】

　　创建并返回一个哈希对象，使用指定的算法来生成哈希摘要。

　　参数 algorithm 取决于平台上 OpenSSL 版本所支持的算法。例如，'sha1', 'md5', 'sha256', 'sha512' 等等

【hash.update(data[, input_encoding])】

　　根据 data 来更新哈希内容，编码方式根据 input_encoding 来定，有 'utf8', 'ascii' 或 'binary'。如果没有传入值，默认编码方式是'utf8'。如果 data 是 Buffer， input_encoding 将会被忽略。

　　因为它是流式数据，所以可以使用不同的数据调用很多次。

【hash.digest([encoding])】

　　计算传入的数据的哈希摘要。encoding 可以是 'hex', 'binary' 或 'base64'，如果没有指定encoding ，将返回 buffer。

　　[注意]调用 digest() 后不能再用 hash 对象。

<div class="cnblogs_code">
<pre>var crypto = require('crypto');
var hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
console.log(hash.digest('hex')); //7e1977739c748beac0c0fd14fd26a544</pre>
</div>

&nbsp;

### Hmac

　　Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：

【crypto.createHmac(algorithm, key)】

　　创建并返回一个 hmac 对象，用指定的算法和秘钥生成 hmac 图谱。

　　它是可读写的流 stream 。写入的数据来用计算 hmac。当写入流结束后，使用 read() 方法来获取计算后的值。也支持老的 update 和 digest 方法。

　　参数 algorithm 取决于平台上 OpenSSL 版本所支持的算法，参见前面的 createHash。key是 hmac 算法中用的 key

【hmac.update(data)】

　　根据 data 更新 hmac 对象。因为它是流式数据，所以可以使用新数据调用多次。

【hmac.digest([encoding])】

　　计算传入数据的 hmac 值。encoding可以是 'hex', 'binary' 或 'base64'，如果没有指定encoding ，将返回 buffer。

　　[注意]调用 digest() 后不能再用 hmac 对象

<div class="cnblogs_code">
<pre>var crypto = require('crypto');
var hmac = crypto.createHmac('sha256', 'match');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
//e82a58066cae2fae4f44e58be1d589b66a5d102c2e8846d796607f02a88c1649
console.log(hmac.digest('hex')); </pre>
</div>

&nbsp;

### AES

　　AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：

【crypto.createCipher(algorithm, password)】

　　使用传入的算法和秘钥来生成并返回加密对象。

　　algorithm 取决于 OpenSSL，例如'aes192'等。password 用来派生 key 和 IV，它必须是一个'binary' 编码的字符串或者一个buffer。

　　它是可读写的流 stream 。写入的数据来用计算 hmac。当写入流结束后，使用 read() 方法来获取计算后的值。也支持老的update 和 digest 方法。

【cipher.update(data[, input_encoding][, output_encoding])】

　　根据 data 来更新哈希内容，编码方式根据 input_encoding 来定，有 'utf8', 'ascii' or 'binary'。如果没有传入值，默认编码方式是'binary'。如果data 是 Buffer，input_encoding 将会被忽略。

　　output_encoding 指定了输出的加密数据的编码格式，它可用是 'binary', 'base64' 或 'hex'。如果没有提供编码，将返回 buffer 。

　　返回加密后的内容，因为它是流式数据，所以可以使用不同的数据调用很多次。

【cipher.final([output_encoding])】

　　返回加密后的内容，编码方式是由 output_encoding 指定，可以是 'binary', 'base64' 或 'hex'。如果没有传入值，将返回 buffer。

　　[注意]cipher 对象不能在 final() 方法之后调用。

<div class="cnblogs_code">
<pre>var crypto = require('crypto');
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
//8a944d97bdabc157a5b7a40cb180e713f901d2eb454220d6aaa1984831e17231f87799ef334e3825123658c80e0e5d0c
console.log(encrypted);</pre>
</div>

【crypto.createDecipher(algorithm, password)】

　　根据传入的算法和密钥，创建并返回一个解密对象。这是 createCipher() 的镜像

【decipher.update(data[, input_encoding][, output_encoding])】

　　使用参数 data 更新需要解密的内容，其编码方式是 'binary','base64' 或 'hex'。如果没有指定编码方式，则把 data 当成 buffer 对象。

　　如果 data 是 Buffer，则忽略 input_encoding 参数。

　　参数 output_decoding 指定返回文本的格式，是 'binary', 'ascii' 或 'utf8' 之一。如果没有提供编码格式，则返回 buffer。

【decipher.final([output_encoding])】

　　返回剩余的解密过的内容，参数 output_encoding 是 'binary', 'ascii' 或 'utf8'，如果没有指定编码方式，返回 buffer。

　　[注意]decipher对象不能在 final() 方法之后使用。

<div class="cnblogs_code">
<pre>var crypto = require('crypto');
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = '8a944d97bdabc157a5b7a40cb180e713f901d2eb454220d6aaa1984831e17231f87799ef334e3825123658c80e0e5d0c';
var decrypted = aesDecrypt(encrypted, key);
console.log(decrypted);//Hello, this is a secret message!</pre>
</div>

　　可以看出，加密后的字符串通过解密又得到了原始内容。

　　注意到AES有很多不同的算法，如`aes192`，`aes-128-ecb`，`aes-256-cbc`等，AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。加密结果通常有两种表示方法：hex和base64，这些功能Nodejs全部都支持，但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。如果无法正确解密，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，加密后的数据是否统一为hex或base64格式

【crypto.createCipheriv(algorithm, key, iv)】

　　创建并返回一个加密对象，用指定的算法，key 和 iv。

　　algorithm 参数和 createCipher() 一致。key 在算法中用到.iv 是一个initialization vector.

　　key 和 iv 必须是 'binary' 的编码字符串或buffers.

【crypto.createDecipheriv(algorithm, key, iv)】

　　根据传入的算法，密钥和 iv，创建并返回一个解密对象。这是 createCipheriv() 的镜像。

<div class="cnblogs_code">
<pre>const crypto = require('crypto');

function aesEncryptiv(data, key,iv) {
    const cipher = crypto.createCipher('aes192', key, iv);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
function aesDecryptiv(encrypted, key,iv) {
    const decipher = crypto.createDecipher('aes192', key, iv);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
var data = 'Hello, this is a secret message!';
var key = 'Password!';
var iv = 'match';
var encrypted = aesEncryptiv(data, key, iv);
var decrypted = aesDecryptiv(encrypted, key, iv);
//Hello, this is a secret message!
console.log(data);
//8a944d97bdabc157a5b7a40cb180e713f901d2eb454220d6aaa1984831e17231f87799ef334e3825123658c80e0e5d0c
console.log(encrypted);
//Hello, this is a secret message!
console.log(decrypted);</pre>
</div>

&nbsp;

### Diffie-Hellman

【crypto.createDiffieHellman(prime[, prime_encoding][, generator][, generator_encoding])】

　　使用传入的 prime 和 generator 创建 Diffie-Hellman 秘钥交互对象。

　　generator 可以是数字，字符串或Buffer。如果没有指定 generator，使用 2

　　prime_encoding 和 generator_encoding 可以是 'binary', 'hex', 或 'base64'。

　　如果没有指定 prime_encoding， 则 Buffer 为 prime。如果没有指定 generator_encoding ，则 Buffer 为 generator。

【diffieHellman.generateKeys([encoding])】

　　生成秘钥和公钥，并返回指定格式的公钥。这个值必须传给其他部分。编码方式： 'binary', 'hex', 或 'base64'。如果没有指定编码方式，将返回 buffer。

【diffieHellman.getPrime([encoding])】

　　用参数 encoding 指明的编码方式返回 Diffie-Hellman 质数，编码方式为: 'binary', 'hex', 或 'base64'。 如果没有指定编码方式，将返回 buffer。

【diffieHellman.getGenerator([encoding])】

　　用参数 encoding 指明的编码方式返回 Diffie-Hellman 生成器，编码方式为: 'binary', 'hex', 或 'base64'. 如果没有指定编码方式 ，将返回 buffer。

【diffieHellman.computeSecret(other_public_key[, input_encoding][, output_encoding])】

　　使用 other_public_key 作为第三方公钥来计算并返回共享秘密（shared secret）。秘钥用input_encoding 编码。编码方式为：'binary', 'hex', 或 'base64'。如果没有指定编码方式 ，默认为 buffer。

　　如果没有指定返回编码方式，将返回 buffer。

**DH算法**

　　DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。DH算法基于数学原理，比如小明和小红想要协商一个密钥，可以这么做：

　　1、小明先选一个素数和一个底数，例如，素数p=23，底数g=5（底数可以任选），再选择一个秘密整数a=6，计算A=g^a mod p=8，然后大声告诉小红：p=23，g=5，A=8；

　　2、小红收到小明发来的p，g，A后，也选一个秘密整数b=15，然后计算B=g^b mod p=19，并大声告诉小明：B=19；

　　3、小明自己计算出s=B^a mod p=2，小红也自己计算出s=A^b mod p=2，因此，最终协商的密钥s为2。

　　在这个过程中，密钥2并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的。第三方只能知道p=23，g=5，A=8，B=19，由于不知道双方选的秘密整数a=6和b=15，因此无法计算出密钥2。

　　用crypto模块实现DH算法如下：

<div class="cnblogs_code">
<pre>var crypto = require('crypto');
// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();
var prime = ming.getPrime();
var generator = ming.getGenerator();
//Prime: 8df777257625c66821af697652f28e93af05b9f779af919111b89816faa11c36fcf9df04c76811471a6099800213c4fe8e3fbec8d2f90bd00795e4b7fd241603
console.log('Prime: ' + prime.toString('hex'));
//Generator: 02
console.log('Generator: ' + generator.toString('hex'));
// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();
// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);
//Secret of Xiao Ming: 4237157ab4c9211f78ffdb67d127d749cec91780d594b81a7e75f1fb591fecb84f33ae6591e1edda4bc9685b503010fe8f9928c6ed69e4ff9fdb44adb9ba1539
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
//Secret of Xiao Hong: 4237157ab4c9211f78ffdb67d127d749cec91780d594b81a7e75f1fb591fecb84f33ae6591e1edda4bc9685b503010fe8f9928c6ed69e4ff9fdb44adb9ba1539
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'))</pre>
</div>

&nbsp;　　[注意]每次输出都不一样，因为素数的选择是随机的。
