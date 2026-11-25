/* Menu SC Nutrition, version Google Sheets. Fichier généré : ne pas modifier à la main. */
window.GAS=true;
(function(){
  var run=function(fn){var a=[].slice.call(arguments,1);return new Promise(function(res,rej){var r=google.script.run.withSuccessHandler(res).withFailureHandler(rej);r[fn].apply(r,a)})};
  var cache=null,subs=[],fails=[];
  var load=function(){return run("getStore").then(function(j){cache=JSON.parse(j);subs.forEach(function(f){f()})},function(e){fails.forEach(function(f){f(e)})})};
  load();window.__reload=function(){if(cache)load()};
  var sub=function(f,err){subs.push(f);if(err)fails.push(err);if(cache)f()};
  var db={
    doc:function(p){return{
      set:function(d){var j=JSON.stringify(d);return run("saveDoc",p,j).then(function(){if(cache)cache[p]=j})},
      delete:function(){return run("deleteDoc",p).then(function(){if(cache)delete cache[p]})},
      onSnapshot:function(cb,err){sub(function(){cb({exists:p in cache,data:function(){return JSON.parse(cache[p])}})},err)}}},
    collection:function(c){return{onSnapshot:function(cb,err){sub(function(){cb({docs:Object.keys(cache).filter(function(k){return k.indexOf(c+"/")===0}).map(function(k){return{id:k.slice(c.length+1),data:function(){return JSON.parse(cache[k])}}})})},err)}}}};
  var mcp={callTool:function(server,tool,input){return run("getTab",String(input.range).split("!")[0]).then(function(j){return{payload:{values:JSON.parse(j)}}})}};
  var caps={db:db,mcp:mcp,user:{can:function(){return Promise.resolve(true)}}};
  window.claude={use:function(n){return Promise.resolve(caps[n]||null)}};
  document.title="Menu SC Nutrition";
  var app=document.getElementById("app");if(app)app.outerHTML="<header>\n  <div class=\"wrap\">\n    <div class=\"top\">\n      <div class=\"brand\"><span class=\"s\">S</span><span class=\"c\">C</span><span class=\"n\">Nutrition</span><small>le menu</small></div>\n      <div class=\"count\">\n        <span class=\"hc\" id=\"hcount\"></span>\n        <label>Marge % <input id=\"nMar\" type=\"number\" min=\"0\" max=\"30\" inputmode=\"numeric\"></label>\n      </div>\n    </div>\n    <nav role=\"tablist\" aria-label=\"Sections\">\n      <button class=\"tab\" role=\"tab\" data-v=\"jour\">Aujourd'hui</button>\n      <button class=\"tab\" role=\"tab\" data-v=\"gard\">Par garderie</button>\n      <button class=\"tab\" role=\"tab\" data-v=\"menu\">Menu 4 semaines</button>\n      <button class=\"tab\" role=\"tab\" data-v=\"recettes\">Recettes</button>\n      <button class=\"tab\" role=\"tab\" data-v=\"courses\">Courses</button>\n    </nav>\n    <div id=\"status\" aria-live=\"polite\"></div>\n  </div>\n</header>\n<main class=\"wrap\" id=\"view\"></main>";
})();











/* QRCode for JavaScript, Copyright (c) 2009 Kazuhiko Arase, MIT license (http://www.d-project.com/) */
(function(){var F={"./QR8bitByte":function(require,module){var QRMode = require('./QRMode');

function QR8bitByte(data) {
	this.mode = QRMode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function() {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;

},
"./QRBitBuffer":function(require,module){function QRBitBuffer() {
	this.buffer = [];
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;

},
"./QRErrorCorrectLevel":function(require,module){module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};


},
"./QRMaskPattern":function(require,module){module.exports = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

},
"./QRMath":function(require,module){var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;

},
"./QRMode":function(require,module){module.exports = {
    MODE_NUMBER :       1 << 0,
    MODE_ALPHA_NUM :    1 << 1,
    MODE_8BIT_BYTE :    1 << 2,
    MODE_KANJI :        1 << 3
};

},
"./QRPolynomial":function(require,module){var QRMath = require('./QRMath');

function QRPolynomial(num, shift) {
	if (num.length === undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] === 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var x = 0; x < e.getLength(); x++) {
			num[x] ^= QRMath.gexp(QRMath.glog(e.get(x) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;

},
"./QRRSBlock":function(require,module){var QRErrorCorrectLevel = require('./QRErrorCorrectLevel');

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock === undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = [];
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
};

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case QRErrorCorrectLevel.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case QRErrorCorrectLevel.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case QRErrorCorrectLevel.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case QRErrorCorrectLevel.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
};

module.exports = QRRSBlock;

},
"./QRUtil":function(require,module){var QRMode = require('./QRMode');
var QRPolynomial = require('./QRPolynomial');
var QRMath = require('./QRMath');
var QRMaskPattern = require('./QRMaskPattern');

var QRUtil = {

    PATTERN_POSITION_TABLE : [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],        
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)    | (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );    
        }
        return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );    
        }
        return (data << 12) | d;
    },

    getBCHDigit : function(data) {

        var digit = 0;

        while (data !== 0) {
            digit++;
            data >>>= 1;
        }

        return digit;
    },

    getPatternPosition : function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
        
        switch (maskPattern) {
            
        case QRMaskPattern.PATTERN000 : return (i + j) % 2 === 0;
        case QRMaskPattern.PATTERN001 : return i % 2 === 0;
        case QRMaskPattern.PATTERN010 : return j % 3 === 0;
        case QRMaskPattern.PATTERN011 : return (i + j) % 3 === 0;
        case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 === 0;
        case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 === 0;
        case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 === 0;
        case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 === 0;

        default :
            throw new Error("bad maskPattern:" + maskPattern);
        }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

        var a = new QRPolynomial([1], 0);

        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
        }

        return a;
    },

    getLengthInBits : function(mode, type) {

        if (1 <= type && type < 10) {

            // 1 - 9

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 10;
            case QRMode.MODE_ALPHA_NUM  : return 9;
            case QRMode.MODE_8BIT_BYTE  : return 8;
            case QRMode.MODE_KANJI      : return 8;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 27) {

            // 10 - 26

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 12;
            case QRMode.MODE_ALPHA_NUM  : return 11;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 10;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 41) {

            // 27 - 40

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 14;
            case QRMode.MODE_ALPHA_NUM  : return 13;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 12;
            default :
                throw new Error("mode:" + mode);
            }

        } else {
            throw new Error("type:" + type);
        }
    },

    getLostPoint : function(qrCode) {
        
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        var row = 0; 
        var col = 0;

        
        // LEVEL1
        
        for (row = 0; row < moduleCount; row++) {

            for (col = 0; col < moduleCount; col++) {

                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {

                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }

                    for (var c = -1; c <= 1; c++) {

                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }

                        if (r === 0 && c === 0) {
                            continue;
                        }

                        if (dark === qrCode.isDark(row + r, col + c) ) {
                            sameCount++;
                        }
                    }
                }

                if (sameCount > 5) {
                    lostPoint += (3 + sameCount - 5);
                }
            }
        }

        // LEVEL2

        for (row = 0; row < moduleCount - 1; row++) {
            for (col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row,     col    ) ) count++;
                if (qrCode.isDark(row + 1, col    ) ) count++;
                if (qrCode.isDark(row,     col + 1) ) count++;
                if (qrCode.isDark(row + 1, col + 1) ) count++;
                if (count === 0 || count === 4) {
                    lostPoint += 3;
                }
            }
        }

        // LEVEL3

        for (row = 0; row < moduleCount; row++) {
            for (col = 0; col < moduleCount - 6; col++) {
                if (qrCode.isDark(row, col) && 
                        !qrCode.isDark(row, col + 1) && 
                         qrCode.isDark(row, col + 2) && 
                         qrCode.isDark(row, col + 3) && 
                         qrCode.isDark(row, col + 4) && 
                        !qrCode.isDark(row, col + 5) && 
                         qrCode.isDark(row, col + 6) ) {
                    lostPoint += 40;
                }
            }
        }

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount - 6; row++) {
                if (qrCode.isDark(row, col) &&
                        !qrCode.isDark(row + 1, col) &&
                         qrCode.isDark(row + 2, col) &&
                         qrCode.isDark(row + 3, col) &&
                         qrCode.isDark(row + 4, col) &&
                        !qrCode.isDark(row + 5, col) &&
                         qrCode.isDark(row + 6, col) ) {
                    lostPoint += 40;
                }
            }
        }

        // LEVEL4
        
        var darkCount = 0;

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col) ) {
                    darkCount++;
                }
            }
        }
        
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;

        return lostPoint;       
    }

};

module.exports = QRUtil;

},
"./index":function(require,module){//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of 
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
// Modified to work in node for this project (and some refactoring)
//---------------------------------------------------------------------

var QR8bitByte = require('./QR8bitByte');
var QRUtil = require('./QRUtil');
var QRPolynomial = require('./QRPolynomial');
var QRRSBlock = require('./QRRSBlock');
var QRBitBuffer = require('./QRBitBuffer');

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

QRCode.prototype = {
	
	addData : function(data) {
		var newData = new QR8bitByte(data);
		this.dataList.push(newData);
		this.dataCache = null;
	},
	
	isDark : function(row, col) {
		if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
			throw new Error(row + "," + col);
		}
		return this.modules[row][col];
	},

	getModuleCount : function() {
		return this.moduleCount;
	},
	
	make : function() {
		// Calculate automatically typeNumber if provided is < 1
		if (this.typeNumber < 1 ){
			var typeNumber = 1;
			for (typeNumber = 1; typeNumber < 40; typeNumber++) {
				var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

				var buffer = new QRBitBuffer();
				var totalDataCount = 0;
				for (var i = 0; i < rsBlocks.length; i++) {
					totalDataCount += rsBlocks[i].dataCount;
				}

				for (var x = 0; x < this.dataList.length; x++) {
					var data = this.dataList[x];
					buffer.put(data.mode, 4);
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
					data.write(buffer);
				}
				if (buffer.getLengthInBits() <= totalDataCount * 8)
					break;
			}
			this.typeNumber = typeNumber;
		}
		this.makeImpl(false, this.getBestMaskPattern() );
	},
	
	makeImpl : function(test, maskPattern) {
		
		this.moduleCount = this.typeNumber * 4 + 17;
		this.modules = new Array(this.moduleCount);
		
		for (var row = 0; row < this.moduleCount; row++) {
			
			this.modules[row] = new Array(this.moduleCount);
			
			for (var col = 0; col < this.moduleCount; col++) {
				this.modules[row][col] = null;//(col + row) % 3;
			}
		}
	
		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this.moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this.moduleCount - 7);
		this.setupPositionAdjustPattern();
		this.setupTimingPattern();
		this.setupTypeInfo(test, maskPattern);
		
		if (this.typeNumber >= 7) {
			this.setupTypeNumber(test);
		}
	
		if (this.dataCache === null) {
			this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
		}
	
		this.mapData(this.dataCache, maskPattern);
	},

	setupPositionProbePattern : function(row, col)  {
		
		for (var r = -1; r <= 7; r++) {
			
			if (row + r <= -1 || this.moduleCount <= row + r) continue;
			
			for (var c = -1; c <= 7; c++) {
				
				if (col + c <= -1 || this.moduleCount <= col + c) continue;
				
				if ( (0 <= r && r <= 6 && (c === 0 || c === 6) ) || 
                     (0 <= c && c <= 6 && (r === 0 || r === 6) ) || 
                     (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
					this.modules[row + r][col + c] = true;
				} else {
					this.modules[row + r][col + c] = false;
				}
			}		
		}		
	},
	
	getBestMaskPattern : function() {
	
		var minLostPoint = 0;
		var pattern = 0;
	
		for (var i = 0; i < 8; i++) {
			
			this.makeImpl(true, i);
	
			var lostPoint = QRUtil.getLostPoint(this);
	
			if (i === 0 || minLostPoint >  lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}
	
		return pattern;
	},
	
	createMovieClip : function(target_mc, instance_name, depth) {
	
		var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
		var cs = 1;
	
		this.make();

		for (var row = 0; row < this.modules.length; row++) {
			
			var y = row * cs;
			
			for (var col = 0; col < this.modules[row].length; col++) {
	
				var x = col * cs;
				var dark = this.modules[row][col];
			
				if (dark) {
					qr_mc.beginFill(0, 100);
					qr_mc.moveTo(x, y);
					qr_mc.lineTo(x + cs, y);
					qr_mc.lineTo(x + cs, y + cs);
					qr_mc.lineTo(x, y + cs);
					qr_mc.endFill();
				}
			}
		}
		
		return qr_mc;
	},

	setupTimingPattern : function() {
		
		for (var r = 8; r < this.moduleCount - 8; r++) {
			if (this.modules[r][6] !== null) {
				continue;
			}
			this.modules[r][6] = (r % 2 === 0);
		}
	
		for (var c = 8; c < this.moduleCount - 8; c++) {
			if (this.modules[6][c] !== null) {
				continue;
			}
			this.modules[6][c] = (c % 2 === 0);
		}
	},
	
	setupPositionAdjustPattern : function() {
	
		var pos = QRUtil.getPatternPosition(this.typeNumber);
		
		for (var i = 0; i < pos.length; i++) {
		
			for (var j = 0; j < pos.length; j++) {
			
				var row = pos[i];
				var col = pos[j];
				
				if (this.modules[row][col] !== null) {
					continue;
				}
				
				for (var r = -2; r <= 2; r++) {
				
					for (var c = -2; c <= 2; c++) {
					
						if (Math.abs(r) === 2 || 
                            Math.abs(c) === 2 ||
                            (r === 0 && c === 0) ) {
							this.modules[row + r][col + c] = true;
						} else {
							this.modules[row + r][col + c] = false;
						}
					}
				}
			}
		}
	},
	
	setupTypeNumber : function(test) {
	
		var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        var mod;
	
		for (var i = 0; i < 18; i++) {
			mod = (!test && ( (bits >> i) & 1) === 1);
			this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
		}
	
		for (var x = 0; x < 18; x++) {
			mod = (!test && ( (bits >> x) & 1) === 1);
			this.modules[x % 3 + this.moduleCount - 8 - 3][Math.floor(x / 3)] = mod;
		}
	},
	
	setupTypeInfo : function(test, maskPattern) {
	
		var data = (this.errorCorrectLevel << 3) | maskPattern;
		var bits = QRUtil.getBCHTypeInfo(data);
        var mod;
	
		// vertical		
		for (var v = 0; v < 15; v++) {
	
			mod = (!test && ( (bits >> v) & 1) === 1);
	
			if (v < 6) {
				this.modules[v][8] = mod;
			} else if (v < 8) {
				this.modules[v + 1][8] = mod;
			} else {
				this.modules[this.moduleCount - 15 + v][8] = mod;
			}
		}
	
		// horizontal
		for (var h = 0; h < 15; h++) {
	
			mod = (!test && ( (bits >> h) & 1) === 1);
			
			if (h < 8) {
				this.modules[8][this.moduleCount - h - 1] = mod;
			} else if (h < 9) {
				this.modules[8][15 - h - 1 + 1] = mod;
			} else {
				this.modules[8][15 - h - 1] = mod;
			}
		}
	
		// fixed module
		this.modules[this.moduleCount - 8][8] = (!test);
	
	},
	
	mapData : function(data, maskPattern) {
		
		var inc = -1;
		var row = this.moduleCount - 1;
		var bitIndex = 7;
		var byteIndex = 0;
		
		for (var col = this.moduleCount - 1; col > 0; col -= 2) {
	
			if (col === 6) col--;
	
			while (true) {
	
				for (var c = 0; c < 2; c++) {
					
					if (this.modules[row][col - c] === null) {
						
						var dark = false;
	
						if (byteIndex < data.length) {
							dark = ( ( (data[byteIndex] >>> bitIndex) & 1) === 1);
						}
	
						var mask = QRUtil.getMask(maskPattern, row, col - c);
	
						if (mask) {
							dark = !dark;
						}
						
						this.modules[row][col - c] = dark;
						bitIndex--;
	
						if (bitIndex === -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}
								
				row += inc;
	
				if (row < 0 || this.moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
		
	}

};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new QRBitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var x = 0; x < rsBlocks.length; x++) {
		totalDataCount += rsBlocks[x].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. (" + 
            buffer.getLengthInBits() + 
            ">" +  
            totalDataCount * 8 + 
            ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 !== 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var x = 0; x < ecdata[r].length; x++) {
            var modIndex = x + modPoly.getLength() - ecdata[r].length;
			ecdata[r][x] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var y = 0; y < rsBlocks.length; y++) {
		totalCodeCount += rsBlocks[y].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var z = 0; z < maxDcCount; z++) {
		for (var s = 0; s < rsBlocks.length; s++) {
			if (z < dcdata[s].length) {
				data[index++] = dcdata[s][z];
			}
		}
	}

	for (var xx = 0; xx < maxEcCount; xx++) {
		for (var t = 0; t < rsBlocks.length; t++) {
			if (xx < ecdata[t].length) {
				data[index++] = ecdata[t][xx];
			}
		}
	}

	return data;

};

module.exports = QRCode;

}},C={};function req(n){if(!C[n]){var m={exports:{}};C[n]=m;F[n](req,m)}return C[n].exports}window.QRCode=req("./index")})();


/* ================= DONNÉES =================
   Ingrédient : [nom, quantité par enfant (2 à 5 ans), unité, rayon]. Quantité 0 = à avoir en réserve.
   Rayons : F fruits et légumes, V viandes et poissons, L laitiers et œufs, E épicerie, S surgelés, B boulangerie */
const RAY={F:"Fruits et légumes",V:"Viandes et poissons",L:"Produits laitiers et œufs",B:"Boulangerie",S:"Surgelés",E:"Épicerie",Z:"À avoir en réserve"};
const R={
d1:{n:"Spaghetti sauce à la viande et légumes",o:"Italie",t:"d",acc:"Brocoli vapeur · Compote de pommes",al:["Blé"],ing:[["Spaghetti de blé entier",35,"g","E"],["Bœuf haché maigre",40,"g","V"],["Tomates broyées en conserve",60,"ml","E"],["Carottes",20,"g","F"],["Oignon",10,"g","F"],["Céleri",10,"g","F"],["Brocoli",40,"g","F"],["Compote de pommes non sucrée",60,"ml","E"],["Huile d'olive",2,"ml","E"],["Fines herbes séchées",0,"","Z"]],st:["Faire revenir l'oignon, les carottes et le céleri hachés fin dans l'huile.","Ajouter le bœuf, bien cuire, puis les tomates. Mijoter 30 minutes.","Cuire les spaghettis, les couper court pour les petits.","Cuire le brocoli à la vapeur, en petits bouquets tendres."]},
d2:{n:"Poulet rôti aux herbes",o:"Québec",t:"d",acc:"Riz brun · Haricots verts · Poire",al:[],ing:[["Hauts de cuisse de poulet désossés",55,"g","V"],["Riz brun",30,"g","E"],["Haricots verts",40,"g","F"],["Poires",0.5,"unité","F"],["Huile d'olive",2,"ml","E"],["Herbes de Provence",0,"","Z"]],st:["Enrober le poulet d'huile et d'herbes. Rôtir à 200 °C environ 30 minutes (74 °C à cœur).","Cuire le riz brun (environ 40 minutes).","Cuire les haricots verts à la vapeur, les couper en tronçons.","Couper le poulet en petits morceaux. Peler et couper les poires."]},
d3:{n:"Chili végé aux haricots rouges",o:"Mexique",t:"d",acc:"Riz brun · Maïs · Orange",al:[],ing:[["Haricots rouges en conserve",60,"ml","E"],["Tomates broyées en conserve",60,"ml","E"],["Maïs en grains surgelé",30,"g","S"],["Poivrons",20,"g","F"],["Oignon",10,"g","F"],["Riz brun",30,"g","E"],["Oranges",0.5,"unité","F"],["Cumin et paprika doux",0,"","Z"]],st:["Rincer les haricots rouges.","Faire revenir l'oignon et les poivrons, ajouter tomates, haricots, maïs et épices douces.","Mijoter 25 minutes. Écraser légèrement pour les plus petits.","Cuire le riz. Couper les oranges en quartiers sans peau."]},
d4:{n:"Poisson pané au four",o:"Québec",t:"d",acc:"Purée de pommes de terre · Petits pois · Melon",al:["Poisson","Blé","Œufs","Lait"],ing:[["Filets de poisson blanc",55,"g","V"],["Chapelure de blé entier",8,"g","E"],["Œufs",0.1,"unité","L"],["Pommes de terre",80,"g","F"],["Lait 3,25 %",20,"ml","L"],["Petits pois surgelés",40,"g","S"],["Melon",60,"g","F"]],st:["Vérifier qu'il ne reste aucune arête. Passer le poisson dans l'œuf battu puis la chapelure.","Cuire au four à 220 °C, 12 à 15 minutes (70 °C à cœur).","Cuire les pommes de terre, les réduire en purée avec le lait chaud.","Cuire les petits pois. Couper le melon en petits cubes."]},
d5:{n:"Pâté chinois aux lentilles",o:"Québec",t:"d",acc:"Salade de carottes râpées · Ananas",al:["Lait"],ing:[["Lentilles brunes sèches",20,"g","E"],["Maïs en grains surgelé",40,"g","S"],["Pommes de terre",90,"g","F"],["Lait 3,25 %",20,"ml","L"],["Oignon",10,"g","F"],["Carottes",40,"g","F"],["Ananas",60,"g","F"]],st:["Cuire les lentilles 25 minutes, les égoutter. Les faire revenir avec l'oignon.","Préparer la purée de pommes de terre avec le lait.","Monter en trois étages : lentilles, maïs, purée. Gratiner 20 minutes à 190 °C.","Râper les carottes finement. Couper l'ananas en petits morceaux."]},
d6:{n:"Mini pizzas maison au poulet",o:"Italie",t:"d",acc:"Bâtonnets de concombre · Raisins coupés en quatre",al:["Blé","Lait"],ing:[["Mini pains pita de blé entier",1,"unité","B"],["Sauce tomate",30,"ml","E"],["Fromage mozzarella râpé",25,"g","L"],["Poitrine de poulet",30,"g","V"],["Poivrons",15,"g","F"],["Concombre",30,"g","F"],["Raisins",50,"g","F"]],st:["Cuire le poulet et le couper en très petits dés.","Garnir chaque pita : sauce, poulet, poivrons en petits dés, mozzarella.","Cuire à 200 °C, 8 à 10 minutes. Couper en pointes.","Couper les raisins en quatre dans le sens de la longueur."]},
d7:{n:"Bourghoul au poulet et légumes",o:"Liban",t:"d",acc:"Concombre au yogourt · Pomme",al:["Blé","Lait"],ing:[["Bourghoul (blé concassé)",30,"g","E"],["Poitrine de poulet",45,"g","V"],["Tomates broyées en conserve",40,"ml","E"],["Pois chiches en conserve",30,"ml","E"],["Oignon",10,"g","F"],["Courgettes",30,"g","F"],["Concombre",30,"g","F"],["Yogourt nature",30,"ml","L"],["Pommes",0.5,"unité","F"]],st:["Faire revenir l'oignon et le poulet en dés. Ajouter courgettes, tomates et pois chiches.","Ajouter le bourghoul et deux fois son volume d'eau. Cuire à couvert 15 minutes.","Écraser un peu les pois chiches pour les plus petits.","Mélanger le concombre en dés et le yogourt. Peler et trancher les pommes finement."]},
d8:{n:"Lasagne à la viande et aux épinards",o:"Italie",t:"d",acc:"Salade verte · Banane",al:["Blé","Lait"],ing:[["Pâtes à lasagne",30,"g","E"],["Bœuf haché maigre",35,"g","V"],["Tomates broyées en conserve",60,"ml","E"],["Épinards surgelés",20,"g","S"],["Fromage ricotta",20,"g","L"],["Fromage mozzarella râpé",15,"g","L"],["Laitue",15,"g","F"],["Bananes",0.5,"unité","F"]],st:["Préparer la sauce : bœuf bien cuit et tomates, mijoter 20 minutes.","Mélanger la ricotta et les épinards décongelés et essorés.","Monter : sauce, pâtes, ricotta aux épinards. Finir par la mozzarella.","Cuire à 190 °C, 40 minutes. Laisser reposer avant de couper."]},
d9:{n:"Saumon au four",o:"Canada",t:"d",acc:"Couscous · Carottes glacées · Clémentine",al:["Poisson","Blé"],ing:[["Filets de saumon",55,"g","V"],["Couscous de blé entier",30,"g","E"],["Carottes",45,"g","F"],["Citron",0.05,"unité","F"],["Clémentines",1,"unité","F"]],st:["Vérifier qu'il ne reste aucune arête. Cuire le saumon à 200 °C, 12 minutes (70 °C à cœur).","Verser de l'eau bouillante sur le couscous, couvrir 5 minutes, égrener.","Cuire les carottes en rondelles fines jusqu'à tendreté.","Émietter le saumon. Séparer les clémentines en quartiers."]},
d10:{n:"Dhal de lentilles corail",o:"Inde",t:"d",acc:"Riz basmati · Pain naan · Mangue",al:["Blé","Lait"],ing:[["Lentilles corail sèches",25,"g","E"],["Tomates broyées en conserve",30,"ml","E"],["Carottes",20,"g","F"],["Oignon",10,"g","F"],["Riz basmati",30,"g","E"],["Pain naan",0.25,"unité","B"],["Yogourt nature",30,"ml","L"],["Mangue surgelée",50,"g","S"],["Curcuma et cumin doux",0,"","Z"]],st:["Faire revenir l'oignon et les carottes râpées avec les épices douces.","Ajouter les lentilles, les tomates et de l'eau. Mijoter 20 minutes.","Cuire le riz. Réchauffer le naan et le couper en lanières.","Servir avec une cuillerée de yogourt. Décongeler la mangue."]},
d11:{n:"Couscous au poulet et aux légumes",o:"Maroc",t:"d",acc:"Semoule · Orange",al:["Blé"],ing:[["Hauts de cuisse de poulet désossés",50,"g","V"],["Couscous de blé entier",30,"g","E"],["Carottes",25,"g","F"],["Courgettes",25,"g","F"],["Navet",15,"g","F"],["Pois chiches en conserve",30,"ml","E"],["Tomates broyées en conserve",20,"ml","E"],["Oignon",10,"g","F"],["Oranges",0.5,"unité","F"],["Ras el hanout doux",0,"","Z"]],st:["Faire dorer le poulet et l'oignon avec les épices douces.","Ajouter les légumes en morceaux, les tomates et de l'eau. Mijoter 35 minutes.","Ajouter les pois chiches 10 minutes avant la fin.","Préparer la semoule. Couper le poulet et les légumes en petits morceaux."]},
d12:{n:"Macaroni au fromage et chou-fleur gratiné",o:"Amérique du Nord",t:"d",acc:"Petits pois · Poire",al:["Blé","Lait"],ing:[["Macaroni de blé entier",40,"g","E"],["Cheddar",25,"g","L"],["Lait 3,25 %",60,"ml","L"],["Chou-fleur",40,"g","F"],["Farine de blé entier",4,"g","E"],["Beurre",4,"g","L"],["Petits pois surgelés",40,"g","S"],["Poires",0.5,"unité","F"]],st:["Cuire les macaronis et le chou-fleur en petits bouquets.","Préparer une béchamel : beurre, farine, lait. Ajouter le cheddar râpé.","Mélanger le tout et gratiner 15 minutes à 190 °C.","Cuire les petits pois. Peler et couper les poires."]},
d13:{n:"Boulettes de bœuf à la tomate (kefta)",o:"Maghreb",t:"d",acc:"Riz basmati · Courgettes · Pomme",al:["Blé","Œufs"],ing:[["Bœuf haché maigre",50,"g","V"],["Œufs",0.05,"unité","L"],["Chapelure de blé entier",5,"g","E"],["Tomates broyées en conserve",50,"ml","E"],["Riz basmati",30,"g","E"],["Courgettes",40,"g","F"],["Pommes",0.5,"unité","F"],["Persil et cumin doux",0,"","Z"]],st:["Mélanger bœuf, œuf, chapelure et persil. Former de petites boulettes.","Cuire les boulettes au four à 200 °C, 15 minutes (71 °C à cœur).","Les finir dans la sauce tomate 10 minutes.","Cuire le riz et les courgettes en demi-rondelles."]},
d14:{n:"Poisson au citron",o:"Méditerranée",t:"d",acc:"Pommes de terre rôties · Haricots verts · Melon",al:["Poisson"],ing:[["Filets de poisson blanc",55,"g","V"],["Pommes de terre",90,"g","F"],["Haricots verts",40,"g","F"],["Citron",0.05,"unité","F"],["Huile d'olive",3,"ml","E"],["Melon",60,"g","F"]],st:["Couper les pommes de terre en petits cubes, les rôtir à 200 °C, 30 minutes.","Vérifier les arêtes. Cuire le poisson avec huile et citron, 12 minutes (70 °C à cœur).","Cuire les haricots verts à la vapeur.","Émietter le poisson. Couper le melon en cubes."]},
d15:{n:"Frittata aux légumes et pommes de terre",o:"Espagne",t:"d",acc:"Pain de blé entier · Tomates · Banane",al:["Œufs","Lait","Blé"],ing:[["Œufs",1,"unité","L"],["Pommes de terre",60,"g","F"],["Poivrons",20,"g","F"],["Épinards surgelés",15,"g","S"],["Cheddar",10,"g","L"],["Pain de blé entier",0.5,"tranche","B"],["Tomates",30,"g","F"],["Bananes",0.5,"unité","F"]],st:["Cuire les pommes de terre en petits dés. Faire revenir les poivrons.","Battre les œufs, ajouter légumes, épinards essorés et cheddar.","Cuire en plaque au four à 180 °C, 25 minutes. Les œufs doivent être bien pris.","Couper en carrés. Couper les tomates en petits dés."]},
d16:{n:"Pâtes au poulet, sauce crémeuse aux épinards",o:"Italie",t:"d",acc:"Brocoli · Clémentine",al:["Blé","Lait"],ing:[["Penne de blé entier",40,"g","E"],["Poitrine de poulet",40,"g","V"],["Lait 3,25 %",50,"ml","L"],["Farine de blé entier",3,"g","E"],["Fromage parmesan",5,"g","L"],["Épinards surgelés",20,"g","S"],["Brocoli",40,"g","F"],["Clémentines",1,"unité","F"]],st:["Cuire le poulet en petits dés.","Épaissir le lait avec la farine, ajouter le parmesan et les épinards.","Cuire les penne, mélanger avec la sauce et le poulet.","Cuire le brocoli à la vapeur."]},
d17:{n:"Tajine de bœuf aux légumes et pois chiches",o:"Maroc",t:"d",acc:"Semoule · Pomme",al:["Blé"],ing:[["Bœuf en cubes à mijoter",50,"g","V"],["Pois chiches en conserve",30,"ml","E"],["Carottes",30,"g","F"],["Patates douces",40,"g","F"],["Oignon",10,"g","F"],["Tomates broyées en conserve",30,"ml","E"],["Couscous de blé entier",30,"g","E"],["Pommes",0.5,"unité","F"],["Cannelle et cumin doux",0,"","Z"]],st:["Faire dorer le bœuf et l'oignon avec les épices douces.","Ajouter tomates et eau. Mijoter 1 h 30 à couvert, jusqu'à ce que la viande s'effiloche.","Ajouter carottes, patates douces et pois chiches, cuire 30 minutes de plus.","Effilocher la viande. Préparer la semoule."]},
d18:{n:"Quesadillas haricots noirs et fromage",o:"Mexique",t:"d",acc:"Maïs · Tomates · Avocat · Ananas",al:["Blé","Lait"],ing:[["Tortillas de blé entier",1,"unité","B"],["Haricots noirs en conserve",50,"ml","E"],["Cheddar",25,"g","L"],["Maïs en grains surgelé",30,"g","S"],["Poivrons",15,"g","F"],["Tomates",30,"g","F"],["Yogourt nature",20,"ml","L"],["Avocat",0.15,"unité","F"],["Ananas",60,"g","F"]],st:["Écraser les haricots noirs rincés avec les poivrons en petits dés.","Garnir une moitié de tortilla : haricots, maïs, cheddar. Refermer.","Dorer au four à 200 °C, 10 minutes. Couper en pointes.","Servir avec tomates en dés, avocat écrasé et yogourt."]},
d19:{n:"Poulet au beurre tout doux",o:"Inde",t:"d",acc:"Riz basmati · Chou-fleur · Mangue",al:["Lait"],ing:[["Poitrine de poulet",50,"g","V"],["Tomates broyées en conserve",50,"ml","E"],["Yogourt nature",25,"ml","L"],["Oignon",10,"g","F"],["Beurre",3,"g","L"],["Riz basmati",30,"g","E"],["Chou-fleur",40,"g","F"],["Mangue surgelée",50,"g","S"],["Garam masala doux",0,"","Z"]],st:["Faire revenir l'oignon dans le beurre avec très peu d'épices.","Ajouter le poulet en dés, puis les tomates. Mijoter 20 minutes (74 °C à cœur).","Hors du feu, ajouter le yogourt.","Cuire le riz et le chou-fleur en petits bouquets."]},
d20:{n:"Gratin de poisson et pommes de terre",o:"France",t:"d",acc:"Petits pois et carottes · Orange",al:["Poisson","Lait"],ing:[["Filets de poisson blanc",50,"g","V"],["Pommes de terre",90,"g","F"],["Lait 3,25 %",40,"ml","L"],["Cheddar",10,"g","L"],["Petits pois surgelés",40,"g","S"],["Carottes",30,"g","F"],["Oranges",0.5,"unité","F"]],st:["Cuire le poisson, l'émietter en vérifiant les arêtes.","Préparer une purée souple avec le lait, y mélanger le poisson.","Couvrir de cheddar et gratiner 15 minutes à 200 °C.","Cuire petits pois et carottes en dés."]},
a1:{n:"Pomme et cheddar",o:"Collation",t:"a",al:["Lait"],ing:[["Pommes",0.5,"unité","F"],["Cheddar",15,"g","L"]],st:["Peler les pommes et les trancher finement (râper pour les poupons).","Couper le cheddar en petits bâtonnets."]},
a2:{n:"Yogourt et petits fruits",o:"Collation",t:"a",al:["Lait"],ing:[["Yogourt nature",75,"ml","L"],["Petits fruits surgelés",30,"g","S"]],st:["Décongeler les petits fruits la veille au réfrigérateur.","Écraser légèrement les bleuets entiers, mélanger au yogourt."]},
a3:{n:"Banane et verre de lait",o:"Collation",t:"a",al:["Lait"],ing:[["Bananes",0.5,"unité","F"],["Lait 3,25 %",100,"ml","L"]],st:["Couper les bananes en rondelles au dernier moment."]},
a4:{n:"Crudités et trempette de pois chiches",o:"Collation",t:"a",al:[],ing:[["Carottes",25,"g","F"],["Concombre",25,"g","F"],["Pois chiches en conserve",25,"ml","E"],["Citron",0.03,"unité","F"],["Huile d'olive",2,"ml","E"]],st:["Mixer pois chiches, citron, huile et un peu d'eau (sans sésame).","Cuire légèrement les carottes pour les moins de 4 ans, les couper en bâtonnets fins.","Couper le concombre en bâtonnets."]},
a5:{n:"Compote de pommes et craquelins",o:"Collation",t:"a",al:["Blé"],ing:[["Compote de pommes non sucrée",60,"ml","E"],["Craquelins de blé entier",10,"g","E"]],st:["Répartir la compote en portions. Servir avec les craquelins."]},
a6:{n:"Poire et fromage",o:"Collation",t:"a",al:["Lait"],ing:[["Poires",0.5,"unité","F"],["Cheddar",15,"g","L"]],st:["Peler les poires bien mûres et les couper en petits morceaux.","Couper le cheddar en petits bâtonnets."]},
a7:{n:"Smoothie fraise-banane",o:"Collation",t:"a",al:["Lait"],ing:[["Lait 3,25 %",80,"ml","L"],["Yogourt nature",30,"ml","L"],["Bananes",0.25,"unité","F"],["Petits fruits surgelés",30,"g","S"]],st:["Mixer tous les ingrédients jusqu'à texture lisse.","Garder au froid (4 °C ou moins) jusqu'au service."]},
a8:{n:"Clémentine et yogourt",o:"Collation",t:"a",al:["Lait"],ing:[["Clémentines",1,"unité","F"],["Yogourt nature",60,"ml","L"]],st:["Séparer les clémentines en quartiers, retirer les pépins."]},
a9:{n:"Melon et fromage cottage",o:"Collation",t:"a",al:["Lait"],ing:[["Melon",60,"g","F"],["Fromage cottage",30,"g","L"]],st:["Couper le melon en petits cubes."]},
a10:{n:"Orange, craquelins et cheddar",o:"Collation",t:"a",al:["Blé","Lait"],ing:[["Oranges",0.5,"unité","F"],["Craquelins de blé entier",10,"g","E"],["Cheddar",10,"g","L"]],st:["Couper les oranges en quartiers sans peau ni pépins."]},
p1:{n:"Muffin maison banane-avoine",o:"Fait maison",t:"p",al:["Blé","Œufs","Lait"],ing:[["Farine de blé entier",15,"g","E"],["Flocons d'avoine",8,"g","E"],["Bananes",0.3,"unité","F"],["Œufs",0.08,"unité","L"],["Lait 3,25 %",15,"ml","L"],["Huile de canola",4,"ml","E"],["Poudre à pâte",0,"","Z"]],st:["Écraser les bananes bien mûres, ajouter œufs, lait et huile.","Incorporer farine, avoine et poudre à pâte sans trop mélanger.","Cuire en mini moules à 180 °C, 15 à 18 minutes. Sans sucre ajouté."]},
p2:{n:"Cake salé au fromage et à la courgette",o:"France",t:"p",al:["Blé","Œufs","Lait"],ing:[["Farine de blé entier",15,"g","E"],["Œufs",0.15,"unité","L"],["Cheddar",10,"g","L"],["Courgettes",15,"g","F"],["Lait 3,25 %",10,"ml","L"],["Huile de canola",4,"ml","E"],["Poudre à pâte",0,"","Z"]],st:["Râper les courgettes et le cheddar.","Mélanger œufs, lait, huile, puis farine et poudre à pâte. Ajouter courgettes et fromage.","Cuire en moule à pain à 180 °C, 40 minutes. Couper en tranches puis en bâtonnets."]},
p3:{n:"Mini pita, fromage à la crème et concombre",o:"Collation",t:"p",al:["Blé","Lait"],ing:[["Mini pains pita de blé entier",0.5,"unité","B"],["Fromage à la crème",10,"g","L"],["Concombre",25,"g","F"]],st:["Tartiner les pitas, les couper en pointes.","Couper le concombre en demi-rondelles fines."]},
p4:{n:"Galette à l'avoine et verre de lait",o:"Fait maison",t:"p",al:["Blé","Lait"],ing:[["Flocons d'avoine",12,"g","E"],["Farine de blé entier",8,"g","E"],["Compote de pommes non sucrée",15,"ml","E"],["Raisins secs",5,"g","E"],["Huile de canola",3,"ml","E"],["Lait 3,25 %",100,"ml","L"]],st:["Hacher les raisins secs. Mélanger tous les ingrédients sauf le lait.","Former de petites galettes plates. Cuire à 180 °C, 12 minutes.","Servir avec un verre de lait."]},
p5:{n:"Pain aux courgettes maison",o:"Fait maison",t:"p",al:["Blé","Œufs"],ing:[["Farine de blé entier",15,"g","E"],["Courgettes",15,"g","F"],["Œufs",0.08,"unité","L"],["Huile de canola",4,"ml","E"],["Compote de pommes non sucrée",10,"ml","E"],["Poudre à pâte et cannelle",0,"","Z"]],st:["Râper les courgettes et les essorer.","Mélanger œufs, huile, compote, puis farine, poudre à pâte et cannelle. Ajouter les courgettes.","Cuire en moule à pain à 180 °C, 45 minutes."]},
p6:{n:"Scone au fromage",o:"Royaume-Uni",t:"p",al:["Blé","Lait"],ing:[["Farine de blé entier",18,"g","E"],["Beurre",4,"g","L"],["Cheddar",8,"g","L"],["Lait 3,25 %",12,"ml","L"],["Poudre à pâte",0,"","Z"]],st:["Sabler la farine, la poudre à pâte et le beurre froid. Ajouter le cheddar râpé.","Ajouter le lait, former une pâte sans trop travailler.","Découper de petits scones. Cuire à 200 °C, 12 minutes."]},
p7:{n:"Pouding au riz à la cannelle",o:"Fait maison",t:"p",al:["Lait"],ing:[["Riz basmati",12,"g","E"],["Lait 3,25 %",90,"ml","L"],["Cannelle",0,"","Z"]],st:["Cuire le riz dans le lait à feu doux, 30 minutes, en remuant.","Parfumer à la cannelle. Refroidir rapidement et garder à 4 °C ou moins."]},
p8:{n:"Muffin carotte-pomme",o:"Fait maison",t:"p",al:["Blé","Œufs"],ing:[["Farine de blé entier",15,"g","E"],["Carottes",10,"g","F"],["Pommes",0.15,"unité","F"],["Œufs",0.08,"unité","L"],["Huile de canola",4,"ml","E"],["Poudre à pâte et cannelle",0,"","Z"]],st:["Râper finement carottes et pommes.","Mélanger œufs et huile, puis farine, poudre à pâte et cannelle. Ajouter carottes et pommes.","Cuire en mini moules à 180 °C, 15 à 18 minutes."]},
p9:{n:"Pain naan et trempette yogourt-concombre",o:"Inde",t:"p",al:["Blé","Lait"],ing:[["Pain naan",0.25,"unité","B"],["Yogourt nature",30,"ml","L"],["Concombre",20,"g","F"]],st:["Râper le concombre, l'essorer et le mélanger au yogourt.","Réchauffer le naan et le couper en lanières."]},
p10:{n:"Crêpes maison et compote",o:"France",t:"p",al:["Blé","Œufs","Lait"],ing:[["Farine de blé entier",12,"g","E"],["Œufs",0.15,"unité","L"],["Lait 3,25 %",40,"ml","L"],["Compote de pommes non sucrée",30,"ml","E"]],st:["Mélanger farine, œufs et lait. Laisser reposer 20 minutes.","Cuire de petites crêpes fines.","Garnir de compote et rouler."]}
};
const MENU=[
 [["a1","d1","p1"],["a2","d2","p2"],["a3","d3","p3"],["a4","d4","p4"],["a5","d5","p5"]],
 [["a6","d6","p6"],["a7","d7","p7"],["a8","d8","p8"],["a9","d9","p9"],["a10","d10","p10"]],
 [["a1","d11","p8"],["a2","d12","p3"],["a3","d13","p1"],["a4","d14","p10"],["a5","d15","p6"]],
 [["a6","d16","p2"],["a7","d17","p4"],["a8","d18","p7"],["a9","d19","p5"],["a10","d20","p9"]]
];
const JOURS=["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];
const TYPE={a:"Collation du matin",d:"Dîner",p:"Collation de l'après-midi"};
const PROT={d2:"v",d6:"v",d7:"v",d11:"v",d16:"v",d19:"v",d1:"b",d8:"b",d13:"b",d17:"b",d4:"p",d9:"p",d14:"p",d20:"p",d3:"g",d5:"g",d10:"g",d12:"g",d15:"g",d18:"g"};
const PL={v:"Volaille",b:"Bœuf",p:"Poisson",g:"Végétarien",x:"Autre"};
const FLAT0=MENU.flat(2);

/* ================= ÉTAT ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const iso=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const parse=s=>{const[a,b,c]=s.split("-").map(Number);return new Date(a,b-1,c,12)};
const monday=d=>{const x=new Date(d);x.setHours(12,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x};
const S={view:"jour",date:iso(new Date()),wk:null,rec:null,q:"",f:"tous",cw:null,
  cfg:{enfants:50,poupons:0,marge:5,debut:iso(monday(new Date()))},checks:{},custom:{},cycles:{},ready:false,linked:false,sheet:null,sync:"",syncCode:"",mc:0,redo:false,pmsg:"",draft:null,del:false,db:null,canWrite:true,livd:{},noms:[],sent:{}};
/* livreur de chaque garderie pour le jour affiché (change d'un jour à l'autre) */
const LV=()=>{const m={};if(S.sheet)S.sheet.liv.forEach(x=>{if(x.date===S.date&&x.livreur&&!m[x.garderie])m[x.garderie]=x.livreur});return m};
const ALL=["Blé","Lait","Œufs","Poisson","Soya","Sésame","Moutarde"];
function applyCustom(){
  Object.keys(R).forEach(k=>{if(R[k].custom)delete R[k]});
  Object.keys(S.custom).forEach(id=>{const c=S.custom[id]||{};
    R[id]={n:String(c.n||"Recette"),o:String(c.o||"Fait maison"),t:["a","d","p"].includes(c.t)?c.t:"d",acc:String(c.acc||""),
      al:Array.isArray(c.al)?c.al.map(String):[],
      ing:(Array.isArray(c.ing)?c.ing:[]).map(i=>[String(i.n||""),Math.max(0,+i.q||0),["g","ml","unité"].includes(i.u)?i.u:"g",RAY[i.r]?i.r:"E"]),
      st:(Array.isArray(c.st)?c.st:[]).map(String),p:PL[c.p]?c.p:"x",custom:true}});
}
function setStatus(t){$("#status").textContent=t}
try{const l=JSON.parse(localStorage.getItem("scmenu")||"null");if(l){Object.assign(S.cfg,l.cfg||{});S.checks=l.checks||{};S.custom=l.custom||{};S.cycles=l.cycles||{};S.linked=!!l.linked;S.sheet=l.sheet||null;S.livd=l.livd||{};S.noms=l.noms||[];S.sent=l.sent||{}}}catch(e){}
applyCustom();
function local(){try{localStorage.setItem("scmenu",JSON.stringify({cfg:S.cfg,checks:S.checks,custom:S.custom,cycles:S.cycles,linked:S.linked,sheet:S.sheet,livd:S.livd,noms:S.noms,sent:S.sent}))}catch(e){}}

/* enregistrement : un seul envoi à la fois par document */
const queues={};
function save(path,data){
  local();
  if(!S.db||!S.canWrite)return;
  const q=queues[path]||(queues[path]={busy:false,next:null});
  q.next=data;if(q.busy)return;
  (async()=>{q.busy=true;
    while(q.next){const d=q.next;q.next=null;
      try{await S.db.doc(path).set(d);setStatus("Enregistré")}
      catch(e){if(e&&e.code==="invalid_argument"){S.canWrite=false;setStatus("Lecture seule : vos changements restent sur cet appareil")}else setStatus("Échec de l'enregistrement, réessayez")}}
    q.busy=false})();
}

/* ================= CALCULS ================= */
/* nombre d'enfants : celui de la feuille pour le jour affiché, sinon le nombre habituel */
function counts(date){
  const liv=S.sheet?S.sheet.liv.filter(x=>x.date===date):[];
  if(liv.length){const tot=liv.reduce((n,x)=>n+x.total,0),pou=liv.reduce((n,x)=>n+Math.min(x.pou,x.total),0);return {enf:tot-pou,pou,jour:true}}
  return {enf:Math.max(0,+S.cfg.enfants||0),pou:Math.max(0,+S.cfg.poupons||0),jour:false}}
const marge=()=>1+Math.max(0,+S.cfg.marge||0)/100;
const factor=()=>{const c=counts(S.date);return (c.enf+c.pou*0.5)*marge()};
const factorHab=()=>(Math.max(0,+S.cfg.enfants||0)+Math.max(0,+S.cfg.poupons||0)*0.5)*marge();
function num(x,dec){return (Math.round(x*Math.pow(10,dec))/Math.pow(10,dec)).toString().replace(".",",")}
function fmt(q,u,shop){
  if(u==="g"||u==="ml"){
    const step=shop?50:10;q=Math.ceil(q/step-1e-9)*step;
    const big=u==="g"?"kg":"L";
    return q>=1000?num(q/1000,2)+" "+big:q+" "+u;
  }
  const n=shop?Math.ceil(q-1e-9):Math.ceil(q*2-1e-9)/2;
  return num(n,1)+" "+u+(n>=2?"s":"");
}
function per(q,u){return u==="g"||u==="ml"?num(q,0)+" "+u:num(q,2)+" "+u}
function absWeek(dateStr){return Math.round((monday(parse(dateStr))-monday(parse(S.cfg.debut)))/(7*864e5))}
const cyc=A=>Math.floor(A/4),wk=A=>((A%4)+4)%4;
const nowA=()=>absWeek(iso(new Date()));
function dayOf(dateStr){return (parse(dateStr).getDay()+6)%7}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
/* combien de fois chaque recette a déjà été servie */
function usage(){const u={};Object.keys(R).forEach(k=>u[k]=0);FLAT0.forEach(id=>{if(id in u)u[id]++});
  Object.values(S.cycles).forEach(f=>f.forEach(id=>{if(id in u)u[id]++}));return u}
/* pioche n recettes d'un type : les moins servies d'abord, au hasard entre égales */
function pick(type,n,u){const pool=Object.keys(R).filter(k=>R[k].t===type),cnt={...u},out=[];
  if(!pool.length)return out;
  while(out.length<n){const pass=shuffle([...pool]).sort((x,y)=>cnt[x]-cnt[y]).slice(0,n-out.length);pass.forEach(k=>cnt[k]++);out.push(...pass)}
  return out}
const catOf=id=>R[id]?(R[id].custom?(R[id].p||"x"):(PROT[id]||"x")):"x";
/* répartit les dîners : chaque type de plat étalé sur les 4 semaines, pas deux fois de suite */
function arrange(d){
  const sorted=shuffle([...d]).sort((x,y)=>catOf(x)<catOf(y)?-1:catOf(x)>catOf(y)?1:0),weeks=[[],[],[],[]];
  sorted.forEach((id,i)=>weeks[i%4].push(id));
  return weeks.map(w=>{let best=w,bs=99;for(let t=0;t<40;t++){const x=shuffle([...w]);let sc=0;for(let i=1;i<x.length;i++)if(catOf(x[i])===catOf(x[i-1]))sc++;if(sc<bs){bs=sc;best=x}if(!sc)break}return best})}
/* répartit les collations sans doublon dans une même semaine */
function deal(list){let best=null,bs=99;
  for(let t=0;t<60;t++){const x=t?shuffle([...list]):[...list],weeks=[[],[],[],[]];x.forEach((id,i)=>weeks[i%4].push(id));
    const sc=weeks.reduce((n,w)=>n+(w.length-new Set(w).size),0);if(sc<bs){bs=sc;best=weeks}if(!sc)break}
  return best}
function generate(){const u=usage(),d=arrange(pick("d",20,u)),a=deal(pick("a",20,u)),p=deal(pick("p",20,u)),f=[];
  for(let w=0;w<4;w++)for(let j=0;j<5;j++)f.push(a[w][j],d[w][j],p[w][j]);return f}
function flatOf(c){let f=S.cycles["c"+c];
  if(!f){if(c<=0||!S.ready)return FLAT0;f=generate();S.cycles["c"+c]=f;save("cycles/c"+c,{slots:f})}
  return f.map((id,i)=>R[id]?id:FLAT0[i])}
function menuOf(c){const f=flatOf(c),m=[];for(let w=0;w<4;w++){m.push([]);for(let j=0;j<5;j++)m[w].push([f[w*15+j*3],f[w*15+j*3+1],f[w*15+j*3+2]])}return m}
function setSlot(c,w,j,k,id){const f=[...flatOf(c)],i=w*15+j*3+k,old=f[i];f[i]=id;S.cycles["c"+c]=f;save("cycles/c"+c,{slots:f});return old}
function shopping(A){
  const m=new Map();
  menuOf(cyc(A))[wk(A)].forEach(day=>day.forEach(id=>R[id].ing.forEach(([n,q,u,r])=>{
    const k=n;const e=m.get(k)||{n,q:0,u,r};e.q+=q;m.set(k,e)})));
  const f=factorHab();const by={};
  [...m.values()].forEach(e=>{const r=e.q===0?"Z":e.r;(by[r]=by[r]||[]).push({...e,tot:e.q*f})});
  Object.values(by).forEach(a=>a.sort((x,y)=>x.n.localeCompare(y.n,"fr")));
  return by;
}

/* ================= FEUILLE GOOGLE « CUISINE DU JOUR » ================= */
const SHEET="1sNYHCFuXNCMH8XDjkdSWvrEGV2viMD_qKiBk-0rbITY";
const norm=x=>String(x||"").toLowerCase().replace(/œ/g,"oe").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const AKEY=[["lait","Lait"],["laitier","Lait"],["laitiers","Lait"],["oeuf","Œufs"],["oeufs","Œufs"],["ble","Blé"],["gluten","Blé"],["poisson","Poisson"],["poissons","Poisson"],["soya","Soya"],["soja","Soya"],["sesame","Sésame"],["moutarde","Moutarde"]];
const word=(txt,w)=>new RegExp("(^|[^a-z])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"s?([^a-z]|$)").test(txt);
/* ce qui, dans une recette, ne convient pas à cet enfant */
function conflicts(kid,id){
  const a=norm(kid.allergies+" , "+kid.autre),r=R[id],hit=new Set();
  AKEY.forEach(([k,t])=>{if(word(a,k)&&r.al.includes(t))hit.add(t)});
  a.split(/[,;\/]| et | ou /).map(x=>x.trim().replace(/s$/,"")).filter(x=>x.length>=4&&!/arachide|noix|aucun|halal|sans |vegetarien/.test(x))
    .forEach(tok=>r.ing.forEach(i=>{const n=norm(i[0]);if(word(n,tok)&&![...hit].some(h=>n.startsWith(norm(h))))hit.add(i[0])}));
  if(/vegetarien/.test(a)&&r.t==="d"&&catOf(id)!=="g")hit.add("viande ou poisson");
  return [...hit];
}
/* remplacements d'ingrédients par allergène : [motif, remplacement, remplacement si allergie au soya] */
const SUB={
 "Lait":[[/^lait/,"boisson de soya enrichie non sucrée","boisson d'avoine enrichie"],[/yogourt/,"yogourt de soya nature","compote de pommes non sucrée"],[/fromage a la creme/,"trempette de pois chiches"],[/cheddar|mozzarella|ricotta|parmesan|cottage|fromage/,"fromage végétal sans lait","trempette de pois chiches"],[/beurre/,"huile de canola"]],
 "Œufs":[[/oeuf/,"compote de pommes (60 ml par œuf) ou sans œuf"]],
 "Blé":[[/spaghetti|penne|macaroni|lasagne/,"pâtes de riz sans gluten"],[/couscous|bourghoul/,"riz ou quinoa"],[/pita|tortilla|naan|pain/,"pain sans gluten"],[/farine/,"farine sans gluten"],[/chapelure/,"chapelure sans gluten"],[/craquelin/,"galettes de riz"],[/avoine/,"avoine certifiée sans gluten"]]
};
const NOEGG=["d15"]; /* plats où l'œuf est l'ingrédient principal : on change de plat */
/* version poupons (purée) de chaque plat */
const PP={a4:"Purée de carottes bien cuites et trempette de pois chiches lisse",a5:"Compote de pommes seule, sans craquelins",a10:"Orange en purée et fromage râpé fin, sans craquelins",a1:"Pomme cuite en purée et cheddar râpé fin",a6:"Poire bien mûre écrasée et cheddar râpé fin",p3:"Pain tendre en petits morceaux et fromage à la crème, sans concombre cru",p9:"Pain tendre en petits morceaux et yogourt, sans concombre cru",p4:"Galette émiettée dans le lait, sans raisins secs"};
function pp(id){const r=R[id];if(PP[id])return PP[id];
  if(r.t==="d")return "Purée de « "+r.n+" » : part prélevée avant d'assaisonner, mixée avec un peu d'eau de cuisson, sans sel. Fruit du dessert écrasé";
  if(r.t==="a")return "Même collation, fruit écrasé à la fourchette";
  return "Même collation, émiettée et humidifiée avec un peu de lait"}
/* trouve quoi servir à cet enfant pour ce repas : null (menu normal), plat adapté, ou plat de remplacement */
function solve(kid,id,weekIds){
  const h=conflicts(kid,id);if(!h.length)return null;
  const a=norm(kid.allergies+" , "+kid.autre),r=R[id],subs=[];let ok=true;
  h.forEach(tag=>{const rules=SUB[tag];if(!rules||(tag==="Œufs"&&NOEGG.includes(id))){ok=false;return}
    let found=false;
    r.ing.forEach(i=>{const rule=rules.find(x=>x[0].test(norm(i[0])));if(!rule)return;found=true;
      let to=rule[1];if(/soya/.test(to)&&word(a,"soya"))to=rule[2]||"";
      if(!to)ok=false;else if(!subs.some(x=>x[0]===i[0]))subs.push([i[0],to])});
    if(!found)ok=false});
  if(ok&&subs.length)return {kind:"adapt",subs};
  const good=x=>x!==id&&R[x].t===r.t&&!conflicts(kid,x).length&&!(/halal/.test(a)&&false);
  const inWeek=[...new Set(weekIds)].filter(good).sort(),alt=inWeek[0]||Object.keys(R).filter(good).sort()[0];
  return alt?{kind:"swap",id:alt,week:!!inWeek[0]}:{kind:"none",h};
}
async function sync(){
  if(window.GAS&&window.__reload)window.__reload();
  S.sync="load";if(S.view==="jour"||S.view==="gard")render();
  try{
    const mcp=window.claude&&await claude.use("mcp");
    if(!mcp){S.sync="none";if(S.view==="jour")render();return}
    const get=async range=>{const r=await mcp.callTool("Google Sheets","get_values",{spreadsheetId:SHEET,range});
      let p=r&&r.payload!==undefined?r.payload:r;if(typeof p==="string"){try{p=JSON.parse(p)}catch(e){p={}}}
      return (p&&Array.isArray(p.values))?p.values:[]};
    const k=await get("Enfants!A2:H1000"),l=await get("Livraisons!A2:E1000"),gd=await get("Garderies!A2:F200");
    const gard={};gd.forEach(r=>{if(r&&r[0])gard[String(r[0]).trim()]={heure:String(r[5]||"").trim(),adresse:String(r[1]||"").trim()}});
    const kids=k.filter(r=>r&&String(r[0]||"").trim()&&["TRUE","VRAI"].includes(String(r[6]).toUpperCase())).map(r=>({prenom:String(r[0]).trim(),garderie:String(r[1]||"").trim(),groupe:String(r[2]||"").trim(),allergies:String(r[3]||"").trim(),texture:String(r[4]||"").trim()||"Régulière",autre:String(r[5]||"").trim()}))
      .filter(x=>x.allergies||x.autre||norm(x.texture)!=="reguliere");
    const liv=l.filter(r=>r&&r[0]&&r[1]).map(r=>({date:String(r[0]).trim().slice(0,10),garderie:String(r[1]).trim(),total:Math.max(0,parseInt(r[2],10)||0),pou:Math.max(0,parseInt(r[3],10)||0),livreur:String(r[4]||"").trim().replace(/\s+/g," ")}));
    S.sheet={kids,liv,gard,at:new Date().toISOString()};S.linked=true;S.sync="ok";S.syncCode="";
  }catch(e){S.sync="err";S.syncCode=(e&&e.code)||""}
  local();const a=document.activeElement;if(!S.draft&&!(a&&a.matches("input,textarea,select")))render();
}
function sheetBar(){
  const btn=l=>`<button class="btn" data-sync ${S.sync==="load"?"disabled":""}>${S.sync==="load"?"Lecture en cours…":l}</button>`;
  if(S.sync==="none")return `<div class="card sheet"><div class="t"><b>Feuille Cuisine du jour</b><p class="note" style="margin-top:2px">La liaison avec Google Sheets n'est pas disponible dans cette vue. Ouvrez l'outil depuis Claude, connecté à votre compte.</p></div></div>`;
  if(S.sync==="err"){
    const m={needs_reauth:"Google Sheets doit être reconnecté : dans Claude, ouvrez Paramètres, puis Connecteurs.",server_not_connected:"Google Sheets n'est pas connecté à ce compte Claude : ajoutez-le dans Paramètres, puis Connecteurs.",not_in_manifest:"Vous n'avez pas autorisé cette page à lire Google Sheets.",approval_required:"L'accès à Google Sheets demande votre accord. Réessayez et acceptez la demande.",blocked_by_policy:"L'accès à Google Sheets est bloqué pour ce compte."}[S.syncCode]||"La feuille n'a pas répondu. Réessayez dans un instant.";
    return `<div class="card sheet"><div class="t"><b>Feuille Cuisine du jour</b><p class="warn" style="margin-top:2px">${m}</p>${S.sheet?`<p class="note" style="margin-top:2px">Affichage des dernières données lues.</p>`:""}</div>${btn("Réessayer")}</div>`;
  }
  if(!S.sheet)return `<div class="card sheet"><div class="t"><b>Relier à votre feuille Cuisine du jour</b><p class="note" style="margin-top:2px">Pour afficher ici les enfants allergiques, les poupons et le nombre d'enfants du jour, lus dans votre feuille Google.</p></div>${btn("Relier ma feuille Google")}</div>`;
  const liv=S.sheet.liv.filter(x=>x.date===S.date),tot=liv.reduce((n,x)=>n+x.total,0),pou=liv.reduce((n,x)=>n+x.pou,0);
  const at=new Date(S.sheet.at).toLocaleTimeString("fr-CA",{hour:"2-digit",minute:"2-digit"});
  return `<div class="card sheet"><div class="t"><b>Feuille Cuisine du jour</b>
    <p style="margin-top:2px">${liv.length?`${liv.length} garderie${liv.length>1?"s":""} à livrer : <b>${tot} enfants</b>, dont <b>${pou} poupon${pou>1?"s":""}</b>.`:`Aucune livraison saisie pour ce jour dans la feuille. Les quantités sont calculées pour votre nombre habituel (${+S.cfg.enfants||0} enfants, ${+S.cfg.poupons||0} poupon${+S.cfg.poupons>1?"s":""}), à régler dans l'onglet Courses.`}</p>
    ${liv.length?`<p class="note" style="margin-top:2px">Les quantités à préparer suivent ce nombre. Pour le changer, modifiez l'onglet Livraisons de la feuille, puis touchez Actualiser.</p>`:""}
    <p class="note" style="margin-top:2px">Lu à ${at}.</p></div>
    <div class="row">${btn("Actualiser")}</div></div>`;
}
const LAB=["Collation du matin","Dîner","Collation de l'après-midi"];
/* ce que mange un enfant particulier ce jour-là ; plain = simple purée sans autre changement */
function kidPlan(k,ids,weekIds){
  const lab=LAB;
    const tx=norm(k.texture)!=="reguliere",pur=/puree/.test(norm(k.texture)),hal=/halal/.test(norm(k.autre+" "+k.allergies));
    const lines=ids.map((id,i)=>{
      const r=solve(k,id,weekIds),served=r&&r.kind==="swap"?r.id:id;let t="";
      if(r&&r.kind==="adapt")t=`<b>${lab[i]} ${i===1?"adapté":"adaptée"} :</b> ${esc(R[id].n)}, avec ${r.subs.map(x=>esc(x[1])+" à la place de « "+esc(x[0])+" »").join(", ")}.`;
      else if(r&&r.kind==="swap")t=`<b>${lab[i]} de remplacement :</b> <button class="lnk sm" data-rec="${r.id}">${esc(R[r.id].n)}</button>${r.week?" (déjà au menu cette semaine)":""}, au lieu de « ${esc(R[id].n)} ».`;
      else if(r)return `<span class="warn">${lab[i]} : aucun plat du bassin ne convient (${esc(r.h.join(", "))}). Préparez une portion à part.</span>`;
      if(hal&&i===1&&["v","b","x"].includes(catOf(served)))t=(t||`<b>Dîner :</b> ${esc(R[served].n)}.`)+" Viande en version halal.";
      if(tx)t=t?t+" "+(pur?"En purée : "+esc(pp(served))+".":"Haché finement."):`<b>${lab[i]}, ${pur?"en purée":"haché finement"} :</b> ${pur?esc(pp(served)):esc(R[served].n)}.`;
      return t?`<span class="fix">${t}</span>`:""}).filter(Boolean);
    return {lines,pur,plain:pur&&!ids.some(id=>solve(k,id,weekIds))&&!(hal&&["v","b","x"].includes(catOf(ids[1])))};
}
function specials(ids,weekIds){
  if(!S.sheet)return "";
  const g=new Set(S.sheet.liv.filter(x=>x.date===S.date).map(x=>x.garderie));
  const kids=S.sheet.kids.filter(k=>!g.size||g.has(k.garderie));
  const pliv={};S.sheet.liv.filter(x=>x.date===S.date&&x.pou>0).forEach(x=>pliv[x.garderie]=(pliv[x.garderie]||0)+x.pou);
  const pk=[],ptot=()=>Object.values(pliv).reduce((a,b)=>a+b,0)||(g.size?0:+S.cfg.poupons||0);
  if(!kids.length&&!ptot())return `<div class="card spec" style="border-top-color:var(--green)"><h3>Repas spéciaux du jour</h3><p class="ok" style="margin-top:6px">Aucun enfant avec allergie, restriction ou texture particulière${g.size?" dans les garderies livrées ce jour":""}.</p></div>`;
  const lab=["Collation du matin","Dîner","Collation de l'après-midi"];
  let n=0;const groups=new Map();
  kids.forEach(k=>{
    const {lines,plain}=kidPlan(k,ids,weekIds);
    if(plain){pk.push(k);return}
    if(lines.length)n++;
    const key=lines.join("|"),grp=groups.get(key)||{lines,kids:[]};grp.kids.push(k);groups.set(key,grp)});
  const uniq=(arr)=>{const seen=new Set();return arr.filter(x=>x&&!seen.has(norm(x))&&seen.add(norm(x)))};
  const rows=[...groups.values()].sort((x,y)=>(y.lines.length?1:0)-(x.lines.length?1:0)||y.kids.length-x.kids.length).map(grp=>{
    const ks=grp.kids,by={};ks.forEach(k=>(by[k.garderie||"Garderie non précisée"]=by[k.garderie||"Garderie non précisée"]||[]).push(k));
    const names=Object.keys(by).sort().map(gn=>`<div style="font-size:15px"><span class="pill">${esc(gn)} · ${by[gn].length}</span> ${by[gn].map(k=>esc(k.prenom)+(k.groupe?" ("+esc(k.groupe)+")":"")).join(", ")}</div>`).join("");
    const tags=uniq(ks.map(k=>k.allergies)).map(x=>`<span class="pill r">Allergie : ${esc(x)}</span>`).join("")+uniq(ks.map(k=>k.autre)).map(x=>`<span class="pill o">${esc(x)}</span>`).join("")+uniq(ks.map(k=>norm(k.texture)!=="reguliere"?k.texture:"")).map(x=>`<span class="pill o">Texture : ${esc(x)}</span>`).join("");
    return `<div class="kid"><div class="row"><b>${grp.lines.length?(ks.length>1?ks.length+" portions identiques":"1 portion"):ks.length+" enfant"+(ks.length>1?"s":"")+" sans changement"}</b>${tags}</div>
      ${grp.lines.join("")||`<span class="ok">Mange${ks.length>1?"nt":""} le menu du jour, sans changement.</span>`}
      <div style="display:flex;flex-direction:column;gap:4px;margin-top:4px">${names}</div></div>`}).join("");
  /* les poupons : un seul groupe, compté par garderie */
  const pby={};Object.keys(pliv).forEach(gn=>pby[gn]={n:pliv[gn],names:[]});
  pk.forEach(k=>{const gn=k.garderie||"Garderie non précisée";(pby[gn]=pby[gn]||{n:0,names:[]}).names.push(esc(k.prenom)+(k.groupe?" ("+esc(k.groupe)+")":""))});
  Object.values(pby).forEach(x=>{x.n=Math.max(x.n,x.names.length)});
  const pn=Object.values(pby).reduce((a,x)=>a+x.n,0)||ptot();
  const pblock=pn?`<div class="kid"><div class="row"><b>${pn>1?pn+" portions identiques":"1 portion"} pour les poupons</b><span class="pill o">Texture : Purée</span></div>
      ${ids.map((id,i)=>`<span class="fix"><b>${lab[i]}, en purée :</b> ${esc(pp(id))}.</span>`).join("")}
      <div style="display:flex;flex-direction:column;gap:4px;margin-top:4px">${Object.keys(pby).sort().map(gn=>`<div style="font-size:15px"><span class="pill">${esc(gn)} · ${pby[gn].n}</span> ${pby[gn].names.join(", ")}</div>`).join("")}</div>
      <p class="note" style="margin:2px 0 0">Demi-portions, déjà comptées dans les quantités du jour.</p></div>`:"";
  return `<div class="card spec"><div class="row sp"><h3>Repas spéciaux du jour</h3><div class="chips">${pn?`<span class="pill o">${pn} poupon${pn>1?"s":""}</span>`:""}<span class="pill r">${n} portion${n>1?"s":""} à part</span></div></div>
    <p class="note" style="margin:4px 0 6px">${g.size?"Enfants des garderies livrées ce jour.":"Aucune livraison saisie pour ce jour : tous les enfants inscrits sont affichés."} Les enfants qui reçoivent exactement le même repas sont regroupés. Chaque portion reste identifiée au prénom de l'enfant.</p>${pblock}${rows}
    <p class="note">Ces repas sont choisis en comparant les allergies de la feuille aux ingrédients des recettes. Lisez toujours l'étiquette des produits de remplacement (boisson de soya, pain sans gluten, etc.) avant de servir.</p></div>`;
}

/* ================= VUES ================= */
function ingTable(id){
  const f=factor();
  const rows=R[id].ing.filter(i=>i[1]>0).map(([n,q,u])=>`<tr><td>${esc(n)}</td><td class="q"><small>${per(q,u)}</small></td><td class="q">${fmt(q*f,u,false)}</td></tr>`).join("");
  const res=R[id].ing.filter(i=>i[1]===0).map(i=>esc(i[0])).join(", ");
  return `<table><thead><tr><th>Ingrédient</th><th class="q">Par enfant</th><th class="q">À préparer</th></tr></thead><tbody>${rows}</tbody></table>${res?`<p class="note">En réserve : ${res}.</p>`:""}`;
}
function alChips(id){const a=R[id].al;return a.length?a.map(x=>`<span class="pill r">${esc(x)}</span>`).join(""):`<span class="pill">Sans allergène prioritaire</span>`}
function mealCard(id,cls){
  const r=R[id];
  return `<section class="card meal ${cls}">
    <div class="k">${TYPE[r.t]}</div>
    <h3><button class="lnk" data-rec="${id}">${esc(r.n)}</button></h3>
    ${r.acc?`<p class="acc">${esc(r.acc)}</p>`:""}
    <div class="chips"><span class="pill o">${esc(r.o)}</span>${alChips(id)}</div>
    ${ingTable(id)}
    ${+S.cfg.poupons>0&&!S.sheet?`<p class="pou"><b>Repas des ${+S.cfg.poupons} poupon${+S.cfg.poupons>1?"s":""} :</b> ${esc(pp(id))}. Demi-portion, déjà comptée dans les quantités.</p>`:""}
    <ul class="steps">${r.st.map(s=>`<li><label><input type="checkbox"><span>${esc(s)}</span></label></li>`).join("")}</ul>
  </section>`;
}
/* lien et code QR du formulaire des livreurs, garderie déjà remplie */
const FORM="https://tally.so/r/6Djz0A";
function gLink(g){const n=(LV()[g]||"").trim();return FORM+"?garderie="+encodeURIComponent(g)+(n?"&livreur="+encodeURIComponent(n):"")}
function qrSvg(text){
  try{const q=new QRCode(-1,0);q.addData(text);q.make();const n=q.getModuleCount();let d="";
    for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(q.isDark(r,c))d+="M"+c+" "+r+"h1v1h-1z";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 ${n+6} ${n+6}" shape-rendering="crispEdges"><rect x="-3" y="-3" width="${n+6}" height="${n+6}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`}
  catch(e){return ""}}
function dayNames(){
  if(!S.sheet)return [];const G=S.sheet.gard||{},n=[...new Set(S.sheet.liv.filter(x=>x.date===S.date).map(x=>x.garderie))];
  return n.sort((x,y)=>((G[x]||{}).heure||"99").localeCompare((G[y]||{}).heure||"99")||x.localeCompare(y,"fr"))}
const jourTxt=()=>parse(S.date).toLocaleDateString("fr-CA",{weekday:"long",day:"numeric",month:"long"});
const gLine=g=>{const h=((S.sheet.gard||{})[g]||{}).heure;return g+(h?" ("+h+")":"")};
/* message pour un livreur (ou pour tous si drv est vide) : une garderie nommée au-dessus de chaque lien */
function saveDay(k){save("envois/"+k,{sent:S.sent[k]||[]})}
function linksText(drv){
  const gs=dayNames().filter(g=>drv===undefined||(LV()[g]||"").trim()===drv);
  return (drv?"Bonjour "+drv+", tes livraisons SC Nutrition du "+jourTxt():"Livraisons SC Nutrition, "+jourTxt())+".\nÀ chaque garderie, touche son lien juste après avoir déposé les bacs :\n\n"+gs.map(g=>gLine(g)+"\n"+gLink(g)).join("\n\n")}
function oneText_unused(g){return gLine(g)+", "+jourTxt()+".\nTouche ce lien juste après avoir déposé les bacs :\n"+gLink(g)}
/* étiquettes à imprimer : bacs, poupons, portions à part */
/* renseignements d'étiquetage obligatoires (MAPAQ) : dénomination et état, quantité nette, ingrédients en ordre décroissant,
   allergènes (« Contient »), nom et adresse du préparateur, origine, utilisation, conservation, date d'emballage, meilleur avant, lot */
const HOME_ADR="5802, rue Druillettes, Montréal (Québec) H1S 1N4";
const UW=[[/oeuf|œuf/i,50],[/clémentine/i,70],[/citron|lime/i,60],[/naan/i,90],[/pita|tortilla|pain|muffin anglais|bagel/i,45],[/tranche/i,30],[/pomme|poire|orange|banane|pêche|mangue/i,150]];
function ingWeight(x){const q=+x[1]||0,u=x[2];if(!q)return 0;if(u==="g"||u==="ml")return q;const w=UW.find(r=>r[0].test(x[0]));return q*(w?w[1]:100)}
const portionG=ing=>Math.round(ing.reduce((n,x)=>n+ingWeight(x),0));
const ingText=ing=>ing.slice().sort((a,b)=>ingWeight(b)-ingWeight(a)).map(x=>x[0].toLowerCase().replace(/ \(.*?\)/,"")).join(", ");
/* allergènes prioritaires, sources de gluten et sulfites, repérés dans le nom de chaque ingrédient */
const ARX=[["Lait",/(^|[\s(,'])lait|fromage|cheddar|mozzarella|ricotta|parmesan|cottage|yogourt|yaourt|beurre|crème|kéfir|labneh|tzatziki/i,/sans lait|végétal|laitue|soya|soja|avoine enrichie|amande|coco|riz/i],
 ["Blé",/blé|farine|pâtes|spaghetti|penne|macaroni|lasagne|couscous|bourghoul|boulgour|semoule|chapelure|pita|tortilla|naan|pain|craquelin|muffin|bagel|biscuit|galette|gaufre|crêpe/i,/sans gluten|de riz|maïs/i],
 ["Œufs",/(^|[\s(,'])(œufs?|oeufs?)\b/i,/par œuf|sans œuf/i],
 ["Poisson",/poisson|saumon|thon|sole|morue|aiglefin|goberge|merlu|tilapia|truite/i,null],
 ["Crustacés et mollusques",/crevette|crabe|homard|moule|pétoncle/i,null],
 ["Soja",/soya|soja|tofu|edamame/i,null],
 ["Sésame",/sésame|tahini|houmous|hummus|trempette de pois chiches/i,null],
 ["Moutarde",/moutarde/i,null],
 ["Arachides",/arachide/i,/sans arachide/i],
 ["Noix",/amande|noix|noisette|pacane|pistache|pignon|cajou/i,/sans noix|muscade|coco/i],
 ["Avoine (gluten)",/avoine/i,/sans gluten/i],
 ["Orge (gluten)",/orge/i,null],["Seigle (gluten)",/seigle/i,null],
 ["Sulfites",/sulfite|abricots secs/i,null]];
function alOf(ing,base){const names=ing.map(x=>x[0]),out=[];
  ARX.forEach(([t,re,no])=>{if(names.some(n=>re.test(n)&&!(no&&no.test(n))))out.push(t)});
  (base||[]).forEach(t=>{if(!out.includes(t)&&!ARX.some(a=>a[0]===t))out.push(t)});return out}
function allergens(id){const a=alOf(R[id].ing);(R[id].al||[]).forEach(t=>{if(!a.includes(t))a.push(t)});return a}
const isCold=ing=>ing.some(x=>/yogourt|fromage|cheddar|(^|\s)lait|(^|\s)(œufs?|oeufs?)\b|houmous|hummus|thon|poulet|dinde|trempette/i.test(x[0]));
/* ce qu'on retire pour une purée de poupon (« sans craquelins », « sans raisins secs »…) */
function withoutSans(ing,txt){const drop=[...String(txt).matchAll(/sans ([a-zàâçéèêëîïôûùüÿœ' ]+)/gi)].map(m=>norm(m[1]).replace(/s\b/g,"").trim().split(" ")[0]).filter(w=>w.length>3&&w!=="sel");
  return ing.filter(x=>!drop.some(w=>norm(x[0]).includes(w)))}
const MOIS=["JA","FE","MR","AL","MA","JN","JL","AU","SE","OC","NO","DE"];
const dCode=d=>{const [y,m,j]=d.split("-");return `${y} ${MOIS[+m-1]} ${j}`};
function labels(){
  if(!S.sheet)return null;
  const A=absWeek(S.date),j=dayOf(S.date);if(j>4)return null;
  const merged={};S.sheet.liv.filter(x=>x.date===S.date).forEach(x=>{const m=merged[x.garderie]=merged[x.garderie]||{tot:0,pou:0};m.tot+=x.total;m.pou+=Math.min(x.pou,x.total)});
  const names=Object.keys(merged);if(!names.length)return null;
  const wm=menuOf(cyc(A))[wk(A)],ids=wm[j],weekIds=wm.flat(),G=S.sheet.gard||{};
  names.sort((x,y)=>((G[x]||{}).heure||"99").localeCompare((G[y]||{}).heure||"99")||x.localeCompare(y,"fr"));
  const date=parse(S.date).toLocaleDateString("fr-CA",{weekday:"long",day:"numeric",month:"long"});
  const top=(g,kind,cls)=>`<div class="top"><span class="g">${esc(g)}</span><span class="k ${cls}">${kind}</span></div>`;
  const adr=(S.cfg.adresse||"").trim()||HOME_ADR,permis=(S.cfg.permis||"").trim(),lot=S.date.slice(2).replace(/-/g,""),dc=dCode(S.date);
  const foot=`<div class="ft"><span>SC Nutrition, ${esc(adr)} · (438) 379-1995${permis?" · Permis "+esc(permis):""}</span><span>Préparé au Québec · Lot ${lot}</span></div>`;
  const dates=`Emballé le ${dc} · Meilleur avant ${dc} : consommer le jour même.`;
  const KIND=["COLLATION DU MATIN","DÎNER","COLLATION D'APRÈS-MIDI"];
  const decong=ing=>S.cfg.decongele&&ing.some(x=>/bœuf|boeuf|poulet|dinde|agneau|veau|porc|viande|poisson|saumon|thon|sole|morue|aiglefin|goberge|merlu|crevette/i.test(x[0]))?", produit décongelé":"";
  const etat=(ing,i)=>(i===1?"Frais, servi chaud":isCold(ing)?"Frais et réfrigéré":"Frais")+decong(ing)+" · Prêt à servir";
  const keep=(ing,i)=>i===1?"Garder au chaud, à 60 °C ou plus, jusqu'au service.":isCold(ing)?"Garder réfrigéré, à 4 °C ou moins.":"Garder au frais, à l'abri de la chaleur.";
  const qty=(ing,n)=>{const g=portionG(ing)*n;return `${n} portion${n>1?"s":""} · env. ${g>=1000?(g/1000).toFixed(1).replace(".",",")+" kg":g+" g"}`};
  /* étiquette de produit : même gabarit pour le menu normal, les poupons et les portions à part */
  const prod=(g,badge,cls,title,ing,i,n,extra,base)=>{const al=alOf(ing,base);
    return `<div class="lb">${top(g,badge,cls)}${extra||""}<div class="hd"><div><div class="nm">${esc(title)}</div><div class="et">${etat(ing,i)}</div></div><div class="qn">${qty(ing,n)}</div></div>
      <div class="ln"><b>Ingrédients :</b> ${esc(ingText(ing))}.${al.length?` <b>Contient : ${esc(al.join(", ").toLowerCase())}.</b>`:""}</div>
      <div class="inf">${keep(ing,i)} ${dates}</div>${foot}</div>`};
  const out=[];
  names.forEach(g=>{
    const m=merged[g],plans=S.sheet.kids.filter(k=>k.garderie===g).map(k=>({k,...kidPlan(k,ids,weekIds)}));
    const spec=plans.filter(x=>!x.plain&&x.lines.length),pouSpec=spec.filter(x=>x.pur).length,pouN=Math.max(0,m.pou-pouSpec),nsp=spec.length-pouSpec,reg=Math.max(0,m.tot-m.pou-nsp);
    const h=(G[g]||{}).heure,qr=qrSvg(gLink(g));
    /* repas de chaque enfant particulier, repas par repas */
    const kidMeals=spec.map(x=>{const k=x.k,a=norm(k.allergies+" "+k.autre),tx=norm(k.texture)!=="reguliere",pur=/puree/.test(norm(k.texture)),hal=/halal/.test(a);
      return {x,meals:ids.map((id,i)=>{const r=solve(k,id,weekIds);
        if(r&&r.kind==="none")return {none:true,h:r.h};
        const served=r&&r.kind==="swap"?r.id:id,halal=hal&&i===1&&["v","b","x"].includes(catOf(served));
        if(!r&&!tx&&!halal)return null;
        let ing=R[served].ing.map(e=>e.slice()),title=R[served].n,base=R[served].al||[];
        if(r&&r.kind==="adapt"){ing=ing.map(e=>{const s=r.subs.find(z=>z[0]===e[0]);return s?[s[1].replace(/ \(.*?\)| ou sans œuf/g,""),e[1],e[2],e[3]]:e});title+=" (adapté)";base=[]}
        if(pur){ing=withoutSans(ing,pp(served));title="Purée : "+title}else if(tx)title+=" (haché finement)";
        if(halal)title+=", viande halal";
        return {ing,title,base}})}});
    const regI=ids.map((id,i)=>reg+kidMeals.filter(km=>!km.x.pur&&!km.meals[i]).length);
    out.push(`<div class="lb">${top(g,"BAC","v")}<div class="bq"><div class="bx"><div class="big">${m.tot} enfants${h?" · "+esc(h):""}</div>
      <div class="cnt"><span><b>${reg}</b> normal</span><span><b>${pouN}</b> poupon${pouN>1?"s":""}</span><span><b>${spec.length}</b> à part</span></div>
      <div class="ln">${ids.map((id,i)=>`<div><b>${LAB[i]} :</b> ${esc(R[id].n)}</div>`).join("")}</div>
      <div class="tp">Chaud : 60 °C ou plus · Froid : 4 °C ou moins</div></div>${qr?`<div class="qr">${qr}<span>Livreur : scanne ici</span></div>`:""}</div>${foot}</div>`);
    ids.forEach((id,i)=>{if(regI[i])out.push(prod(g,KIND[i],"v",R[id].n,R[id].ing,i,regI[i],"",R[id].al))});
    if(pouN){const pn=plans.filter(x=>x.plain).map(x=>x.k.prenom).join(", ");
      ids.forEach((id,i)=>{const ing=withoutSans(R[id].ing,pp(id));
        out.push(prod(g,"POUPONS · "+KIND[i],"o",(i===1?"Purée : ":"Version poupons : ")+R[id].n,ing,i,pouN,pn&&i===0?`<div class="sub">${esc(pn)}</div>`:"",R[id].al))})}
    kidMeals.forEach(({x,meals})=>{const k=x.k;
      const who=`<div class="kid"><b>${esc(k.prenom)}</b>${k.groupe?` <small>${esc(k.groupe)}</small>`:""}${k.allergies?` <span class="al">ALLERGIE : ${esc(k.allergies)}</span>`:""}</div>`;
      meals.forEach((ml,i)=>{if(!ml)return;
        if(ml.none){out.push(`<div class="lb">${top(g,"À PART · "+KIND[i],"r")}${who}<div class="ln"><b>Aucun plat du menu ne convient (${esc(ml.h.join(", "))}).</b> Préparer une portion à part et écrire ici le nom du plat et ses ingrédients : ______________________________</div><div class="inf">${dates}</div>${foot}</div>`);return}
        out.push(prod(g,"À PART · "+KIND[i],"r",ml.title,ml.ing,i,1,who,ml.base))})});
  });
  const css=`@page{size:Letter;margin:0.5in 0.156in}
*{box-sizing:border-box}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#111;background:#eee}
.bar{background:#1F4D0F;color:#fff;padding:14px 18px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.bar button{font-size:17px;font-weight:700;padding:10px 18px;border:0;border-radius:10px;background:#F6C343;color:#1F4D0F;cursor:pointer}
.bar p{margin:0;font-size:14px}
.sheet{width:8.188in;margin:18px auto;display:grid;grid-template-columns:4in 4in;column-gap:0.188in;background:#fff}
.lb{width:4in;height:2in;padding:0.1in 0.14in;overflow:hidden;display:flex;flex-direction:column;gap:2px;border:1px dashed #bbb;break-inside:avoid;page-break-inside:avoid}
.top{display:flex;justify-content:space-between;gap:6px;align-items:baseline}
.g{font-weight:700;font-size:11pt;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.k{font-size:7pt;font-weight:700;padding:1px 6px;border-radius:8px;border:1.5px solid #111;white-space:nowrap}
.k.v{color:#1F4D0F;border-color:#1F4D0F}.k.o{color:#B85A00;border-color:#B85A00}.k.r{color:#fff;background:#B3261E;border-color:#B3261E}
.big{font-size:16pt;font-weight:700;line-height:1.1}.big small{font-size:10pt;font-weight:400}
.al{font-size:10.5pt;font-weight:700;color:#B3261E}
.sub{font-size:9pt}
.cnt{display:flex;gap:12px;font-size:9.5pt}
.ln{font-size:7.6pt;line-height:1.22;flex:1;overflow:hidden}
.tp{font-size:7.5pt}
.bq{display:flex;gap:8px;flex:1;min-height:0}.bx{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.qr{flex:0 0 1.08in;text-align:center;font-size:6.5pt;font-weight:700;line-height:1.1}.qr svg{width:1.08in;height:1.08in;display:block}
.ft{display:flex;justify-content:space-between;flex-wrap:wrap;column-gap:8px;font-size:6pt;line-height:1.15;color:#333;border-top:1px solid #999;padding-top:1px}
.nm{font-size:10.5pt;font-weight:700;line-height:1.1}
.hd{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}.hd>div:first-child{min-width:0}
.et{font-size:7.5pt;font-style:italic}
.qn{font-size:9pt;font-weight:700;white-space:nowrap;text-align:right}
.kid{font-size:10pt;line-height:1.15}.kid small{font-size:8pt}.kid .al{font-size:8.5pt}
.inf{font-size:6.8pt;line-height:1.15}
@media print{body{background:#fff}.bar{display:none}.sheet{margin:0;width:auto}.lb{border-color:transparent}
*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
`,body=out.join(""),info=`${out.length} étiquettes · ${esc(date)}. Papier Lettre, échelle 100 % (« taille réelle »), sans en-têtes ni pieds de page. Feuilles d'étiquettes 4 po × 2 po (Avery 5163) ou papier ordinaire à découper.`;
  const html=`<!doctype html><html lang="fr-CA"><head><meta charset="utf-8"><title>Étiquettes SC Nutrition, ${esc(date)}</title><style>
${css}</style></head><body>
<div class="bar"><button onclick="window.print()">Imprimer</button><p>${info}</p></div>
<div class="sheet">${body}</div><scr${""}ipt>document.querySelectorAll(".ln").forEach(function(e){var f=7.6;while(e.scrollHeight>e.clientHeight+1&&f>5.2){f-=0.3;e.style.fontSize=f+"pt";e.style.lineHeight="1.12"}})</scr${""}ipt></body></html>`;
  return {html,css,body,info,n:out.length};
}
/* version Google : aperçu des étiquettes dans la page, puis impression directe */
function showLabels(L){
  let o=$("#pv");if(o)o.remove();o=document.createElement("div");o.id="pv";document.body.appendChild(o);
  const sh=o.attachShadow({mode:"open"});
  sh.innerHTML=`<style>${L.css}:host{display:block;font-family:Arial,Helvetica,sans-serif;color:#111}.bar button+button{background:#fff}</style><div class="bar"><button id="pr">Imprimer</button><button id="cl">Fermer</button><p>${L.info}</p></div><div class="sheet">${L.body}</div>`;
  sh.querySelectorAll(".ln").forEach(e=>{let f=7.6;while(e.scrollHeight>e.clientHeight+1&&f>5.2){f-=0.3;e.style.fontSize=f+"pt";e.style.lineHeight="1.12"}});
  sh.getElementById("pr").onclick=()=>window.print();sh.getElementById("cl").onclick=()=>o.remove();
}
function vGard(){
  const d=parse(S.date),A=absWeek(S.date),j=dayOf(S.date);
  const head=`<div class="row sp datebar"><div><p class="hand">Un bac par garderie, sans mélange</p><div class="d">${esc(d.toLocaleDateString("fr-CA",{weekday:"long",day:"numeric",month:"long"}))}</div></div>
    <div class="row"><button class="btn ic" data-shift="-1" aria-label="Jour précédent">‹</button><button class="btn" data-today>Aujourd'hui</button><button class="btn ic" data-shift="1" aria-label="Jour suivant">›</button></div></div>`;
  if(j>4)return head+`<div class="card empty"><p class="h2">Pas de livraison la fin de semaine</p></div>`;
  if(!S.sheet)return head+sheetBar();
  const merged={};S.sheet.liv.filter(x=>x.date===S.date).forEach(x=>{const m=merged[x.garderie]=merged[x.garderie]||{tot:0,pou:0};m.tot+=x.total;m.pou+=Math.min(x.pou,x.total)});
  const names=Object.keys(merged);
  if(!names.length)return head+sheetBar()+`<div class="card empty"><p class="h2">Aucune livraison saisie pour ce jour</p><p style="margin-top:10px">Ajoutez une ligne par garderie dans l'onglet Livraisons de votre feuille Google (date, garderie, nombre d'enfants, dont poupons), puis touchez Actualiser.</p></div>`;
  const wm=menuOf(cyc(A))[wk(A)],ids=wm[j],weekIds=wm.flat(),G=S.sheet.gard||{};
  const base=names.reduce((n,g)=>n+(merged[g].tot-merged[g].pou)+merged[g].pou*0.5,0)||1;
  names.sort((x,y)=>((G[x]||{}).heure||"99").localeCompare((G[y]||{}).heure||"99")||x.localeCompare(y,"fr"));
  const cards=names.map(g=>{
    const m=merged[g],plans=S.sheet.kids.filter(k=>k.garderie===g).map(k=>({k,...kidPlan(k,ids,weekIds)}));
    const spec=plans.filter(x=>!x.plain&&x.lines.length),nsp=spec.filter(x=>!x.pur).length,pouN=Math.max(0,m.pou-(spec.length-nsp)),reg=Math.max(0,m.tot-m.pou-nsp);
    const pnames=plans.filter(x=>x.plain).map(x=>esc(x.k.prenom)).join(", ");
    const share=Math.round(((m.tot-m.pou)+m.pou*0.5)/base*100);
    return `<section class="card gcard">
      <div class="row sp"><h3>${esc(g)}</h3><div class="chips">${(G[g]||{}).heure?`<span class="pill y">Livraison ${esc(G[g].heure)}</span>`:""}<span class="pill">${m.tot} enfants</span></div></div>
      <div class="tiles"><div><b>${reg}</b>menu normal</div><div class="o"><b>${pouN}</b>poupon${pouN>1?"s":""}, en purée</div><div class="r"><b>${spec.length}</b>portion${spec.length>1?"s":""} à part</div></div>
      <div class="gl"><b>Menu normal, ${reg} portion${reg>1?"s":""}</b>${ids.map((id,i)=>`<div>${LAB[i]} : ${esc(R[id].n)}</div>`).join("")}</div>
      ${pouN?`<div class="gl o"><b>Poupons, ${pouN} portion${pouN>1?"s":""} en purée</b>${pnames?`<div>${pnames}</div>`:""}${ids.map((id,i)=>`<div>${LAB[i]} : ${esc(pp(id))}</div>`).join("")}</div>`:""}
      ${spec.length?`<div class="gl r"><b>Portions à part, à étiqueter au prénom</b>${spec.map(x=>`<div class="kid"><div class="row"><b>${esc(x.k.prenom)}</b>${x.k.groupe?`<span class="pill y">${esc(x.k.groupe)}</span>`:""}${x.k.allergies?`<span class="pill r">Allergie : ${esc(x.k.allergies)}</span>`:""}${x.k.autre?`<span class="pill o">${esc(x.k.autre)}</span>`:""}</div>${x.lines.join("")}</div>`).join("")}</div>`:""}
      <p class="note" style="margin:0">Part de la préparation du jour : environ ${share} %.</p>
    </section>`}).join("");
  const tot=names.reduce((n,g)=>n+merged[g].tot,0);
  return head+sheetBar()+`<p class="note" style="margin:0 0 12px">${names.length} garderie${names.length>1?"s":""}, ${tot} enfants. Vous cuisinez une seule fois pour tout le monde (onglet Aujourd'hui), puis vous remplissez un bac par garderie avec les nombres ci-dessous.</p>
  <div class="card sheet"><div class="t"><b>Étiquettes du jour</b><p class="note" style="margin-top:2px">Par garderie : une étiquette de bac, puis une étiquette de produit pour chaque repas du menu normal, des poupons et de chaque portion à part (au prénom de l'enfant). Chaque étiquette de produit indique la dénomination et l'état, la quantité nette, les ingrédients en ordre décroissant, les allergènes, la conservation, la date d'emballage et le meilleur avant, le préparateur et son adresse, l'origine et le lot. Format 4 po × 2 po, 10 par feuille Lettre (compatible Avery 5163).</p>
    <label style="display:block;margin-top:8px;font-weight:600;font-size:14px">Adresse de la cuisine de production (imprimée sur chaque étiquette)<input type="text" data-cfgtxt="adresse" value="${esc(S.cfg.adresse||HOME_ADR)}" maxlength="90" style="display:block;width:100%;height:40px;margin-top:4px;border:1.5px solid var(--green);border-radius:999px;padding:0 14px;font:inherit;font-size:15px;font-weight:400;background:#fff;color:inherit"></label>
    <label style="display:block;margin-top:8px;font-weight:600;font-size:14px">Numéro de permis MAPAQ (facultatif, imprimé s'il est rempli)<input type="text" data-cfgtxt="permis" value="${esc(S.cfg.permis||"")}" maxlength="30" placeholder="Laisser vide tant que le permis n'est pas obtenu" style="display:block;width:100%;height:40px;margin-top:4px;border:1.5px solid var(--green);border-radius:999px;padding:0 14px;font:inherit;font-size:15px;font-weight:400;background:#fff;color:inherit"></label>
    <label style="display:flex;gap:8px;align-items:center;margin-top:8px;font-weight:600;font-size:14px"><input type="checkbox" data-cfgchk="decongele" ${S.cfg.decongele?"checked":""} style="width:22px;height:22px;accent-color:var(--green)"> Viandes et poissons achetés surgelés (ajoute « produit décongelé » sur l'étiquette)</label>${S.lmsg?`<p class="${/prêtes/.test(S.lmsg)?"ok":"warn"}" style="margin-top:4px" role="status">${esc(S.lmsg)}</p>`:""}</div><button class="btn main" data-labels>${window.GAS?"Imprimer les étiquettes":"Télécharger les étiquettes"}</button></div>
  ${(()=>{const sent=S.sent["J"+S.date]||[],drvs=[...new Set(names.map(g=>(LV()[g]||"").trim()).filter(Boolean))].sort((x,y)=>x.localeCompare(y,"fr"));
  return `<div class="card" style="margin-bottom:16px;background:#F7FBF2"><b>Liens pour les livreurs</b>
    <p class="note" style="margin-top:2px">Chaque garderie a son propre lien : il ouvre le formulaire avec le nom de cette garderie déjà rempli. Le code QR de l'étiquette du bac mène au même lien. Si l'imprimante ne fonctionne pas, copiez le message d'un livreur et collez-le dans un texto : le nom de la garderie est écrit au-dessus de chaque lien.</p>
    <div class="lk">${names.map((g,i)=>`<div class="lkr ${sent.includes(g)?"done":""}"><span class="lkn"><b>${esc(g)}</b>${(G[g]||{}).heure?` <span class="pill y">${esc(G[g].heure)}</span>`:""}</span>
      ${LV()[g]?`<span class="pill">Livreur : ${esc(LV()[g])}</span>`:`<span class="pill o">Livreur à inscrire dans la feuille</span>`}
      <label class="lks"><input type="checkbox" data-sent="${i}" ${sent.includes(g)?"checked":""}> Envoyé</label></div>`).join("")}</div>
    <div class="row" style="margin-top:12px;gap:8px">${drvs.map(d=>`<button class="btn main" data-copydrv="${esc(d)}">Copier ${names.filter(g=>(LV()[g]||"").trim()===d).length>1?"les liens":"le lien"} de ${esc(d)}</button>`).join("")}${!drvs.length||names.length>1?`<button class="btn" data-copyall>Copier toutes les garderies</button>`:""}</div>
    <p class="note" style="margin-top:8px">Le livreur de chaque garderie s'écrit dans la colonne Livreur de l'onglet Livraisons de la feuille, sur la ligne du jour. Touchez ensuite Actualiser : un bouton par livreur apparaît ici, avec seulement ses garderies, et son nom est déjà rempli dans le formulaire.</p>
    ${S.cmsg?`<p class="ok" style="margin-top:8px" role="status">${esc(S.cmsg)}</p>`:""}
    ${S.linktxt?`<p class="warn" style="margin-top:8px">La copie automatique ne fonctionne pas ici. Sélectionnez le texte ci-dessous et copiez-le.</p><textarea readonly rows="6" style="width:100%;font:inherit;font-size:14px;margin-top:6px;padding:8px;border-radius:10px;border:1px solid var(--green)">${esc(S.linktxt)}</textarea>`:""}</div>`})()}
  <div class="grid g2">${cards}</div>`;
}
function vJour(){
  const d=parse(S.date),A=absWeek(S.date),w=wk(A),j=dayOf(S.date);
  const label=d.toLocaleDateString("fr-CA",{weekday:"long",day:"numeric",month:"long"});
  const head=`<div class="row sp datebar">
    <div><p class="hand">${S.date===iso(new Date())?"Bon matin !":"Préparation du"}</p><div class="d">${esc(label)}</div>
    <div class="chips" style="margin-top:6px"><span class="pill y">Semaine ${w+1} du menu</span><span class="pill">${num(factor(),1)} portions</span></div></div>
    <div class="row"><button class="btn ic" data-shift="-1" aria-label="Jour précédent">‹</button><button class="btn" data-today>Aujourd'hui</button><button class="btn ic" data-shift="1" aria-label="Jour suivant">›</button></div>
  </div>`;
  if(j>4)return head+`<div class="card empty"><p class="h2">Pas de service la fin de semaine</p><p style="margin:10px 0 18px">C'est le bon moment pour faire les courses de la semaine qui vient.</p><button class="btn main" data-go="courses">Voir la liste de courses</button></div>`;
  const [a,di,p]=menuOf(cyc(A))[w][j];
  return head+sheetBar()+specials([a,di,p],menuOf(cyc(A))[w].flat())+`<div class="grid g3">${mealCard(a,"y")}${mealCard(di,"")}${mealCard(p,"o")}</div>
  <div class="temp"><div><b>60 °C ou plus</b>Plats chauds, au départ et à l'arrivée</div><div class="o"><b>4 °C ou moins</b>Plats froids, yogourt, lait, fromage</div></div>
  <p class="note">Portions prévues pour des enfants de 2 à 5 ans. Un poupon compte pour une demi-portion. Pour les moins de 12 mois, validez les aliments permis avec la garderie et les parents. Viandes en version halal sur demande.</p>`;
}
function vMenu(){
  const A=nowA(),c=cyc(A)+S.mc,m=menuOf(c),cur=S.mc?-1:wk(A),w=S.wk==null?(S.mc?0:wk(A)):S.wk,tj=dayOf(iso(new Date()));
  const rows=m[w].map((day,i)=>`<tr class="${w===cur&&i===tj?"now":""}"><td class="day">${JOURS[i]}</td>
    <td><button class="lnk sm" data-rec="${day[0]}">${esc(R[day[0]].n)}</button></td>
    <td><button class="lnk" data-rec="${day[1]}">${esc(R[day[1]].n)}</button><div class="acc" style="font-size:14px;color:var(--muted)">${esc(R[day[1]].acc||"")}</div><span class="pill o" style="margin-top:4px">${esc(R[day[1]].o)}</span>${R[day[1]].custom?` <span class="pill y">Ma recette</span>`:""}</td>
    <td><button class="lnk sm" data-rec="${day[2]}">${esc(R[day[2]].n)}</button></td></tr>`).join("");
  const nd=Object.keys(R).filter(k=>R[k].t==="d").length,nc=Object.keys(R).length-nd;
  return `<p class="hand">Pioché dans votre bassin de ${nd} dîners et ${nc} collations</p><h2 class="h2">Menu de 4 semaines</h2>
  <div class="wk" style="margin-bottom:6px">${[["0","Cycle en cours"],["1","Cycle suivant"]].map(([k,l])=>`<button data-mc="${k}" aria-pressed="${+k===S.mc}">${l}</button>`).join("")}</div>
  <div class="wk" style="margin-top:0">${[0,1,2,3].map(i=>`<button data-wk="${i}" aria-pressed="${i===w}">Semaine ${i+1}${i===cur?" · en cours":""}</button>`).join("")}</div>
  <div class="card scroll"><table class="mt"><thead><tr><th>Jour</th><th>Collation du matin</th><th>Dîner</th><th>Collation de l'après-midi</th></tr></thead><tbody>${rows}</tbody></table></div>
  <div class="card" style="margin-top:16px"><div class="row sp"><div style="flex:1 1 260px"><b>Repiocher ce cycle</b><p class="note" style="margin-top:2px">Tire un nouveau menu au hasard pour ${S.mc?"le cycle suivant":"le cycle en cours"}, en donnant la priorité aux recettes les moins servies.${S.mc?"":" Attention : cela change aussi les repas de cette semaine."}</p></div>
  <button class="btn" data-redo ${S.ready?"":"disabled"}>${S.redo?"Confirmer : repiocher":"Repiocher le menu"}</button></div></div>
  <div class="card" style="margin-top:16px"><div class="row sp"><div><b>Début du cycle</b><p class="note" style="margin-top:2px">Le lundi où commence la semaine 1 du premier cycle.</p></div>
  <input id="debut" type="date" value="${esc(S.cfg.debut)}" style="min-height:44px;border-radius:999px;border:2px solid var(--line);padding:0 14px;background:#fff"></div></div>
  <p class="note">Tous les 4 semaines, un nouveau menu est pioché tout seul : les recettes les moins servies passent en premier, vos nouvelles recettes entrent donc dès le cycle suivant. Chaque type de plat (volaille, bœuf, poisson, végétarien) est réparti sur les 4 semaines, sans deux jours de suite. Pour changer un jour précis, ouvrez une recette et utilisez « Mettre au menu ».</p>`;
}
function vForm(){
  const d=S.draft,inp="min-height:44px;border-radius:14px;border:2px solid var(--line);padding:0 12px;background:#fff;width:100%";
  return `<button class="btn back" data-cancel>‹ Annuler</button>
  <div class="card" style="display:flex;flex-direction:column;gap:16px">
    <h2 class="h2">${d.id?"Modifier ma recette":"Nouvelle recette"}</h2>
    <label>Nom du plat<input data-d="n" value="${esc(d.n)}" placeholder="Ex. : Riz au poulet de maman" style="${inp}"></label>
    <div class="grid g2">
      <label>Moment<select data-d="t" style="${inp}">${Object.keys(TYPE).map(k=>`<option value="${k}" ${d.t===k?"selected":""}>${TYPE[k]}</option>`).join("")}</select></label>
      <label>Origine (facultatif)<input data-d="o" value="${esc(d.o)}" placeholder="Ex. : Algérie" style="${inp}"></label>
    </div>
    <label>Type de plat (pour un dîner : sert à équilibrer le menu)<select data-d="p" style="${inp}">${Object.keys(PL).map(k=>`<option value="${k}" ${d.p===k?"selected":""}>${PL[k]}</option>`).join("")}</select></label>
    <label>Accompagnements (facultatif)<input data-d="acc" value="${esc(d.acc)}" placeholder="Ex. : Riz · Carottes · Pomme" style="${inp}"></label>
    <div><b>Allergènes présents</b><div class="chips" style="margin-top:6px">${ALL.map(a=>`<label class="pill ${d.al.includes(a)?"r":""}" style="cursor:pointer;gap:6px;min-height:36px"><input type="checkbox" data-al="${a}" ${d.al.includes(a)?"checked":""}>${a}</label>`).join("")}</div></div>
    <div><b>Ingrédients, pour 1 enfant</b><p class="note" style="margin:2px 0 8px">Quantité crue pour un enfant de 2 à 5 ans. Mettez 0 pour un ingrédient gardé en réserve (épices, poudre à pâte).</p>
      ${d.ing.map((g,i)=>`<div class="row" style="margin-bottom:8px;flex-wrap:wrap">
        <input data-i="${i}" data-k="n" value="${esc(g.n)}" placeholder="Ingrédient" aria-label="Ingrédient ${i+1}" style="${inp};flex:2 1 160px;width:auto">
        <input data-i="${i}" data-k="q" type="number" min="0" step="any" inputmode="decimal" value="${esc(g.q)}" placeholder="Qté" aria-label="Quantité par enfant" style="${inp};flex:0 0 84px;width:84px">
        <select data-i="${i}" data-k="u" aria-label="Unité" style="${inp};flex:0 0 92px;width:92px">${["g","ml","unité"].map(u=>`<option ${g.u===u?"selected":""}>${u}</option>`).join("")}</select>
        <select data-i="${i}" data-k="r" aria-label="Rayon" style="${inp};flex:1 1 150px;width:auto">${Object.keys(RAY).filter(r=>r!=="Z").map(r=>`<option value="${r}" ${g.r===r?"selected":""}>${RAY[r]}</option>`).join("")}</select>
        <button class="btn ic" data-deling="${i}" aria-label="Retirer cet ingrédient">×</button></div>`).join("")}
      <button class="btn" data-adding>+ Ajouter un ingrédient</button></div>
    <label>Préparation, une étape par ligne<textarea data-d="st" rows="5" placeholder="Faire revenir l'oignon...&#10;Ajouter le poulet..." style="${inp};min-height:120px;padding:10px 12px;font:inherit">${esc(d.st)}</textarea></label>
    <p id="ferr" class="note" style="color:var(--red);margin:0" aria-live="polite"></p>
    <div class="row"><button class="btn main" data-saverec>Enregistrer la recette</button><button class="btn" data-cancel>Annuler</button></div>
  </div>`;
}
function vRecettes(){
  if(S.draft)return vForm();
  if(S.rec&&R[S.rec]){const r=R[S.rec];
    return `<div class="row sp back"><button class="btn" data-back>‹ Toutes les recettes</button>${r.custom?`<div class="row"><button class="btn" data-edit>Modifier</button><button class="btn" data-delrec style="border-color:var(--red);color:var(--red)">${S.del?"Confirmer la suppression":"Supprimer"}</button></div>`:""}</div>
    <div class="card meal ${r.t==="d"?"":r.t==="a"?"y":"o"}"><div class="k">${TYPE[r.t]}</div><h2 class="h2">${esc(r.n)}</h2>
    ${r.acc?`<p class="acc">Servi avec : ${esc(r.acc)}</p>`:""}
    <div class="chips">${r.custom?`<span class="pill y">Ma recette</span>`:""}<span class="pill o">${esc(r.o)}</span>${alChips(S.rec)}<span class="pill y">${num(factor(),1)} portions</span></div>
    <div class="grid g2" style="margin-top:6px"><div><h3 style="font-size:18px;margin-bottom:6px">Ingrédients</h3>${ingTable(S.rec)}</div>
    <div><h3 style="font-size:18px;margin-bottom:6px">Préparation</h3><ol style="margin:0;padding-left:22px;display:flex;flex-direction:column;gap:8px">${r.st.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></div></div></div>
    <div class="card" style="margin-top:16px;display:flex;flex-direction:column;gap:10px;border-color:var(--yellow)">
      <b style="font-size:18px">Mettre au menu</b>
      <p class="note" style="margin:0">Cette recette remplace ${r.t==="d"?"le dîner":r.t==="a"?"la collation du matin":"la collation de l'après-midi"} du jour choisi. Les courses se recalculent.</p>
      <div class="row">
        <select id="pc" aria-label="Cycle" style="min-height:44px;border-radius:999px;border:2px solid var(--line);padding:0 12px;background:#fff"><option value="0">Cycle en cours</option><option value="1">Cycle suivant</option></select>
        <select id="pw" aria-label="Semaine" style="min-height:44px;border-radius:999px;border:2px solid var(--line);padding:0 12px;background:#fff">${[0,1,2,3].map(i=>`<option value="${i}" ${i===wk(nowA())?"selected":""}>Semaine ${i+1}</option>`).join("")}</select>
        <select id="pj" aria-label="Jour" style="min-height:44px;border-radius:999px;border:2px solid var(--line);padding:0 12px;background:#fff">${JOURS.map((x,i)=>`<option value="${i}" ${i===Math.min(4,dayOf(iso(new Date())))?"selected":""}>${x}</option>`).join("")}</select>
        <button class="btn main" data-place ${S.ready?"":"disabled"}>Placer ce jour-là</button>
        <button class="btn" data-placetoday ${S.ready?"":"disabled"}>Mettre au menu d'aujourd'hui</button>
      </div>
      <p id="pmsg" style="margin:0;font-weight:600;color:var(--green-d)" aria-live="polite">${esc(S.pmsg)}</p>
    </div>`;
  }
  const q=S.q.trim().toLowerCase();
  const ids=Object.keys(R).filter(id=>{const r=R[id];
    if(S.f==="d"&&r.t!=="d")return false;if(S.f==="c"&&r.t==="d")return false;
    return !q||(r.n+" "+r.o+" "+r.ing.map(i=>i[0]).join(" ")).toLowerCase().includes(q)});
  return `<p class="hand">${Object.keys(R).length} recettes testées pour les petits</p><div class="row sp"><h2 class="h2">Recettes</h2><button class="btn main" data-new>+ Ajouter une recette</button></div>
  <div class="row" style="margin-top:12px"><input class="search" id="q" type="search" placeholder="Chercher un plat ou un ingrédient" value="${esc(S.q)}" aria-label="Chercher une recette">
  <div class="wk" style="margin:0">${[["tous","Toutes"],["d","Dîners"],["c","Collations"]].map(([k,l])=>`<button data-f="${k}" aria-pressed="${S.f===k}">${l}</button>`).join("")}</div></div>
  <div class="rl" id="rl">${ids.length?ids.map(id=>`<button class="card rc" data-rec="${id}"><span class="k" style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">${TYPE[R[id].t]}</span><b>${esc(R[id].n)}</b><span class="chips">${R[id].custom?`<span class="pill y">Ma recette</span>`:""}<span class="pill o">${esc(R[id].o)}</span></span></button>`).join(""):`<p class="empty">Aucune recette ne correspond.</p>`}</div>`;
}
function vCourses(){
  const off=S.cw||0,A=nowA()+off,by=shopping(A),ck=S.checks["A"+A]||[];
  const lun=monday(new Date());lun.setDate(lun.getDate()+off*7);
  let total=0,done=0;
  const secs=Object.keys(RAY).filter(r=>by[r]).map(r=>`<div class="ray"><h3>${RAY[r]}</h3>${by[r].map(e=>{
    const c=ck.includes(e.n);total++;if(c)done++;
    return `<label class="it ${c?"done":""}"><input type="checkbox" data-ck="${esc(e.n)}" ${c?"checked":""}><span>${esc(e.n)}</span><b>${r==="Z"?"":fmt(e.tot,e.u,true)}</b></label>`}).join("")}</div>`).join("");
  return `<p class="hand">Pour ${+S.cfg.enfants||0} enfants${+S.cfg.poupons?` et ${+S.cfg.poupons} poupons`:""}, marge de ${+S.cfg.marge||0} %</p><h2 class="h2">Liste de courses</h2>
  <div class="card sheet"><div class="t"><b>Nombre habituel pour la semaine</b><p class="note" style="margin-top:2px">Sert à calculer cette liste de courses, et les quantités des jours où aucune livraison n'est encore saisie dans la feuille.</p></div>
    <div class="count"><label>Enfants <input data-cfg="enfants" type="number" min="0" max="2000" inputmode="numeric" value="${+S.cfg.enfants||0}"></label><label class="o">Poupons <input data-cfg="poupons" type="number" min="0" max="500" inputmode="numeric" value="${+S.cfg.poupons||0}"></label></div></div>
  <div class="wk">${["Cette semaine","Semaine prochaine","Dans 2 semaines","Dans 3 semaines"].map((l,i)=>`<button data-cw="${i}" aria-pressed="${i===off}">${l}</button>`).join("")}</div>
  <div class="row sp"><div class="chips"><span class="pill">Semaine du ${esc(lun.toLocaleDateString("fr-CA",{day:"numeric",month:"long"}))}</span><span class="pill y">${done} sur ${total} achetés</span></div><div class="row"><button class="btn" data-copy>Copier la liste</button><button class="btn" data-clear>Tout décocher</button></div></div>
  ${secs}
  <p class="note">Quantités brutes à acheter pour les 5 jours, arrondies au 50 g ou 50 ml supérieur. Vérifiez ce qu'il vous reste avant d'acheter.</p>`;
}
function render(){
  document.querySelectorAll(".tab").forEach(t=>t.setAttribute("aria-selected",t.dataset.v===S.view));
  const hc=counts(S.view==="jour"||S.view==="gard"?S.date:iso(new Date())),he=$("#hcount");
  if(he)he.textContent=hc.jour?`${S.view==="jour"||S.view==="gard"?"Jour affiché":"Aujourd'hui"} : ${hc.enf+hc.pou} enfants, dont ${hc.pou} poupon${hc.pou>1?"s":""}`:`Nombre habituel : ${hc.enf} enfants, ${hc.pou} poupon${hc.pou>1?"s":""}`;
  $("#view").innerHTML={jour:vJour,gard:vGard,menu:vMenu,recettes:vRecettes,courses:vCourses}[S.view]();
}
function go(v){S.view=v;render();window.scrollTo(0,0)}

/* ================= ÉVÉNEMENTS ================= */
document.addEventListener("click",async e=>{
  const t=e.target.closest("[data-v],[data-rec],[data-back],[data-shift],[data-today],[data-go],[data-wk],[data-cw],[data-f],[data-copy],[data-clear],[data-new],[data-edit],[data-delrec],[data-adding],[data-deling],[data-saverec],[data-cancel],[data-mc],[data-redo],[data-place],[data-placetoday],[data-sync],[data-usecount],[data-labels],[data-copyall],[data-copylink],[data-copydrv]");
  if(!t)return;
  if(!("delrec" in t.dataset))S.del=false;
  if(!("redo" in t.dataset))S.redo=false;
  if(!("place" in t.dataset)&&!("placetoday" in t.dataset))S.pmsg="";
  if("labels" in t.dataset){
    const L=labels();if(!L){S.lmsg="Aucune livraison ce jour : rien à étiqueter.";return render()}
    if(window.GAS){showLabels(L);return}
    try{const dl=window.claude&&await claude.use("downloads");
      if(!dl){S.lmsg="Le téléchargement n'est pas disponible dans cette vue. Ouvrez l'outil depuis Claude, connecté à votre compte.";return render()}
      await dl.save({filename:"etiquettes-"+S.date+".html",data:L.html});
      S.lmsg=L.n+" étiquettes prêtes. Ouvrez le fichier téléchargé, puis touchez « Imprimer » en haut de la page."}
    catch(err){const c=err&&err.code;S.lmsg=c==="declined"?"Téléchargement annulé.":c==="rate_limited"?"Un instant, puis réessayez.":"Le téléchargement n'a pas fonctionné ici. Réessayez depuis Claude sur votre ordinateur."}
    return render()}
  if(!("labels" in t.dataset))S.lmsg="";
  S.cmsg="";S.linktxt="";
  if("copyall" in t.dataset||t.dataset.copylink!==undefined||t.dataset.copydrv!==undefined){
    let txt,msg;
    if(t.dataset.copydrv!==undefined){txt=linksText(t.dataset.copydrv);msg="Message de "+t.dataset.copydrv+" copié, avec seulement ses garderies : collez-le dans un texto, puis cochez Envoyé."}
    else{txt=linksText();msg="Message copié avec toutes les garderies du jour."}
    try{await navigator.clipboard.writeText(txt);S.cmsg=msg}catch(err){S.linktxt=txt}
    return render()}
  if("sync" in t.dataset)return sync();
  if(t.dataset.mc){S.mc=+t.dataset.mc;S.wk=null;return render()}
  if("redo" in t.dataset){
    if(!S.redo){S.redo=true;return render()}
    S.redo=false;const c=cyc(nowA())+S.mc;delete S.cycles["c"+c];const f=generate();S.cycles["c"+c]=f;save("cycles/c"+c,{slots:f});setStatus("Nouveau menu pioché");return render()}
  if("place" in t.dataset||"placetoday" in t.dataset){
    const r=R[S.rec],k={a:0,d:1,p:2}[r.t];let c,w,j;
    if("placetoday" in t.dataset){const A=nowA();j=dayOf(iso(new Date()));if(j>4){S.pmsg="Pas de service aujourd'hui : choisissez un jour de semaine.";return render()}c=cyc(A);w=wk(A)}
    else{c=cyc(nowA())+ +$("#pc").value;w=+$("#pw").value;j=+$("#pj").value}
    const old=setSlot(c,w,j,k,S.rec);
    S.pmsg="C'est placé : "+JOURS[j].toLowerCase()+", semaine "+(w+1)+(c>cyc(nowA())?" du cycle suivant":"")+(R[old]&&old!==S.rec?". Remplace « "+R[old].n+" ».":".");
    return render()}
  if("new" in t.dataset){S.draft={id:null,n:"",t:"d",p:"v",o:"",acc:"",al:[],ing:[{n:"",q:"",u:"g",r:"E"}],st:""};return go("recettes")}
  if("edit" in t.dataset){const r=R[S.rec];S.draft={id:S.rec,n:r.n,t:r.t,p:r.p||"x",o:r.o,acc:r.acc||"",al:[...r.al],ing:r.ing.map(i=>({n:i[0],q:i[1],u:i[2],r:i[3]==="Z"?"E":i[3]})),st:r.st.join("\n")};return render()}
  if("cancel" in t.dataset){S.draft=null;return render()}
  if("adding" in t.dataset){S.draft.ing.push({n:"",q:"",u:"g",r:"E"});return render()}
  if(t.dataset.deling!==undefined){S.draft.ing.splice(+t.dataset.deling,1);if(!S.draft.ing.length)S.draft.ing.push({n:"",q:"",u:"g",r:"E"});return render()}
  if("saverec" in t.dataset){
    const d=S.draft,ing=d.ing.filter(i=>String(i.n).trim()).map(i=>({n:String(i.n).trim(),q:Math.max(0,parseFloat(String(i.q).replace(",","."))||0),u:i.u,r:i.r}));
    if(!d.n.trim()){$("#ferr").textContent="Donnez un nom à la recette.";return}
    if(!ing.length){$("#ferr").textContent="Ajoutez au moins un ingrédient.";return}
    const id=d.id||"c"+Date.now().toString(36);
    S.custom[id]={n:d.n.trim(),t:d.t,p:d.p,o:d.o.trim()||"Fait maison",acc:d.acc.trim(),al:d.al,ing,st:d.st.split("\n").map(x=>x.trim()).filter(Boolean)};
    applyCustom();save("recettes/"+id,S.custom[id]);S.draft=null;S.rec=id;return go("recettes")}
  if("delrec" in t.dataset){
    if(!S.del){S.del=true;return render()}
    const id=S.rec;S.del=false;delete S.custom[id];applyCustom();local();S.rec=null;
    if(S.db&&S.canWrite){try{await S.db.doc("recettes/"+id).delete();setStatus("Recette supprimée")}catch(err){setStatus("Échec de la suppression")}}
    return render()}
  if(t.dataset.v)return go(t.dataset.v);
  if(t.dataset.rec){S.rec=t.dataset.rec;return go("recettes")}
  if("back" in t.dataset){S.rec=null;return render()}
  if(t.dataset.shift){const d=parse(S.date);d.setDate(d.getDate()+ +t.dataset.shift);S.date=iso(d);return render()}
  if("today" in t.dataset){S.date=iso(new Date());return render()}
  if(t.dataset.go){const d=parse(S.date);d.setDate(d.getDate()+2);S.cw=Math.min(3,Math.max(0,absWeek(iso(d))-nowA()));return go(t.dataset.go)}
  if(t.dataset.wk){S.wk=+t.dataset.wk;return render()}
  if(t.dataset.cw){S.cw=+t.dataset.cw;return render()}
  if(t.dataset.f){S.f=t.dataset.f;return render()}
  if("clear" in t.dataset){const k="A"+(nowA()+(S.cw||0));S.checks[k]=[];save("courses/"+k,{checked:[]});return render()}
  if("copy" in t.dataset){
    const by=shopping(nowA()+(S.cw||0));
    const txt="Courses SC Nutrition\n"+Object.keys(RAY).filter(r=>by[r]).map(r=>"\n"+RAY[r].toUpperCase()+"\n"+by[r].map(x=>"- "+x.n+(r==="Z"?"":" : "+fmt(x.tot,x.u,true))).join("\n")).join("\n");
    try{await navigator.clipboard.writeText(txt);setStatus("Liste copiée : collez-la dans un texto ou une note")}
    catch(err){setStatus("Copie impossible ici : sélectionnez la liste à la main")}
  }
});
document.addEventListener("change",e=>{
  const t=e.target;
  if(t.dataset.ck!==undefined){
    const k="A"+(nowA()+(S.cw||0)),a=new Set(S.checks[k]||[]);
    t.checked?a.add(t.dataset.ck):a.delete(t.dataset.ck);S.checks[k]=[...a];save("courses/"+k,{checked:S.checks[k]});render();
  }
  if(t.dataset.sent!==undefined){const g=dayNames()[+t.dataset.sent],k="J"+S.date,a=new Set(S.sent[k]||[]);t.checked?a.add(g):a.delete(g);S.sent[k]=[...a];
    local();saveDay(k);render()}
  if(t.dataset.cfgchk){S.cfg[t.dataset.cfgchk]=t.checked;local();save("config/menu",S.cfg);render()}
  if(t.dataset.cfgtxt){S.cfg[t.dataset.cfgtxt]=t.value.trim().replace(/\s+/g," ").slice(0,90);local();save("config/menu",S.cfg);render()}
  if(t.dataset.cfg){S.cfg[t.dataset.cfg]=Math.max(0,parseInt(t.value,10)||0);save("config/menu",S.cfg);render()}
  if(t.id==="debut"&&t.value){S.cfg.debut=iso(monday(parse(t.value)));S.wk=null;save("config/menu",S.cfg);render()}
});
document.addEventListener("input",e=>{
  const t=e.target;
  if(S.draft){
    if(t.dataset.d)S.draft[t.dataset.d]=t.value;
    else if(t.dataset.k)S.draft.ing[+t.dataset.i][t.dataset.k]=t.value;
    else if(t.dataset.al){const a=new Set(S.draft.al);t.checked?a.add(t.dataset.al):a.delete(t.dataset.al);S.draft.al=[...a];t.closest("label").classList.toggle("r",t.checked)}
    return}
  if(t.id==="q"){S.q=t.value;const p=t.selectionStart;render();const n=$("#q");n.focus();try{n.setSelectionRange(p,p)}catch(x){}}
});
[["nMar","marge"]].forEach(([id,k])=>{
  const el=$("#"+id);el.value=S.cfg[k];
  el.addEventListener("input",()=>{S.cfg[k]=Math.max(0,parseInt(el.value,10)||0);save("config/menu",S.cfg);render()});
});
function syncInputs(){[["nMar","marge"]].forEach(([id,k])=>{const el=$("#"+id);if(document.activeElement!==el)el.value=S.cfg[k]})}

render();
if(S.linked||window.GAS)sync();
(async()=>{
  let db=null;
  try{db=window.claude&&await claude.use("db")}catch(e){}
  if(!db){S.ready=true;setStatus("Vos réglages sont gardés sur cet appareil");render();return}
  S.db=db;
  try{const user=await claude.use("user");if(user){const c=await user.can("data.write");if(c===false){S.canWrite=false;setStatus("Lecture seule")}}}catch(e){}
  const timer=setTimeout(()=>setStatus("Données pas encore accessibles, réessayez dans un moment"),10000);
  db.doc("config/menu").onSnapshot(s=>{clearTimeout(timer);
    if(s.exists){Object.assign(S.cfg,s.data());local();syncInputs();if(!document.activeElement||!document.activeElement.matches("input[type=number],input[type=search],input[type=text],textarea"))render()}
    if(S.canWrite)setStatus("À jour")},()=>{clearTimeout(timer);setStatus("Connexion perdue : rechargez la page")});
  db.collection("recettes").onSnapshot(s=>{S.custom={};s.docs.forEach(d=>{S.custom[d.id]=d.data()});applyCustom();local();if(!S.draft&&S.view!=="jour")render()},()=>{});
  db.collection("cycles").onSnapshot(s=>{s.docs.forEach(d=>{const x=d.data().slots;if(Array.isArray(x)&&x.length===60)S.cycles[d.id]=x.map(String)});
    const first=!S.ready;S.ready=true;local();const a=document.activeElement;if(first||!(S.draft||(a&&a.matches("input[type=number],input[type=search],select"))))render()},()=>{});
  const rg=()=>{local();const a=document.activeElement;if(S.view==="gard"&&!(a&&a.matches("input,textarea")))render()};
  db.doc("config/livreurs").onSnapshot(s=>{if(s.exists){const d=s.data();S.noms=[...new Set([...(d.noms||[]),...(d.list||[]).map(x=>x&&x.n)].filter(Boolean).map(String))].sort((x,y)=>x.localeCompare(y,"fr"));rg()}},()=>{});
  db.collection("envois").onSnapshot(s=>{s.docs.forEach(d=>{const x=d.data();S.sent[d.id]=(x.sent||[]).map(String);const m={};(x.liv||[]).forEach(e=>{if(e&&e.g&&e.n)m[String(e.g)]=String(e.n)});S.livd[d.id]=m});rg()},()=>{});
  db.collection("courses").onSnapshot(s=>{s.docs.forEach(d=>{S.checks[d.id]=(d.data().checked)||[]});local();if(S.view==="courses")render()},()=>{});
})();
