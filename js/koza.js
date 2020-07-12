// 地図の埋め込み
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('sample'), { // #sampleに地図を埋め込む
        center: { // 地図の中心を指定
            lat: 26.336442,
            lng: 127.799614
        },
        zoom: 19 // 地図のズームを指定
    });
}

// 地図にマーカーを立てる
var map;
var marker;
var center = {
    lat: 26.336442,
    lng: 127.799614
};

function initMap() {
    map = new google.maps.Map(document.getElementById('sample'), { // #sampleに地図を埋め込む
        center: center, // 地図の中心を指定
        zoom: 19 // 地図のズームを指定
    });

    marker = new google.maps.Marker({ // マーカーの追加
        position: center, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
    });
}

// マーカーに吹き出しを追加
var map;
var marker;
var infoWindow;
var center = {
    lat: 26.336442,
    lng: 127.799614
};

function initMap() {
    map = new google.maps.Map(document.getElementById('sample'), { // #sampleに地図を埋め込む
        center: center, // 地図の中心を指定
        zoom: 19 // 地図のズームを指定
    });

    marker = new google.maps.Marker({ // マーカーの追加
        position: center, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
    });

    infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
        content: '<div class="sample">TAM 大阪</div>' // 吹き出しに表示する内容
    });
    marker.addListener('click', function () { // マーカーをクリックしたとき
        infoWindow.open(map, marker); // 吹き出しの表示
    });
}
// 住所から緯度と経緯を調べる
var geocoder;

function initMap() {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': '沖縄県沖縄市中央1丁目14-3' // sunabaco koza
    }, function (results, status) { // 結果
        if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
            console.group('Success');
            console.log(results);
            console.log(status);
        } else { // 失敗した場合
            console.group('Error');
            console.log(results);
            console.log(status);
        }
    });
}

// 調べた結果を使って、地図とマーカーを表示
var map;
var marker;
var geocoder;

function initMap() {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': '沖縄県沖縄市中央1丁目14-3' // sunabaco koza
    }, function (results, status) { // 結果
        if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
            map = new google.maps.Map(document.getElementById('sample'), {
                center: results[0].geometry.location, // 地図の中心を指定
                zoom: 19 // 地図のズームを指定
            });
            marker = new google.maps.Marker({
                position: results[0].geometry.location, // マーカーを立てる位置を指定
                map: map // マーカーを立てる地図を指定
            });
        } else { // 失敗した場合
            alert(status);
        }
    });
}

// google mapに複数マーカーを立てる
var map;
var marker = [];
var infoWindow = [];
var markerData = [ // マーカーを立てる場所名・緯度・経度
    {
        name: 'SUNABACO KOZA',
        lat: 26.336442,
        lng: 127.799614
    }, {
        name: '麺やKEIJIRO本店',
        lat: 26.335556,
        lng: 127.800526
    }, {
        name: 'りんりん',
        lat: 26.336958,
        lng: 127.800650
    }
];

function initMap() {
    // 地図の作成
    var mapLatLng = new google.maps.LatLng({
        lat: markerData[0]['lat'],
        lng: markerData[0]['lng']
    }); // 緯度経度のデータ作成
    map = new google.maps.Map(document.getElementById('sample'), { // #sampleに地図を埋め込む
        center: mapLatLng, // 地図の中心を指定
        zoom: 15 // 地図のズームを指定
    });

    // マーカー毎の処理
    for (var i = 0; i < markerData.length; i++) {
        markerLatLng = new google.maps.LatLng({
            lat: markerData[i]['lat'],
            lng: markerData[i]['lng']
        }); // 緯度経度のデータ作成
        marker[i] = new google.maps.Marker({ // マーカーの追加
            position: markerLatLng, // マーカーを立てる位置を指定
            map: map // マーカーを立てる地図を指定
        });

        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
        });

        markerEvent(i); // マーカーにクリックイベントを追加
    }

    marker[0].setOptions({ // TAM 東京のマーカーのオプション設定
        icon: {
            url: markerData[0]['icon'] // マーカーの画像を変更
        }
    });
}

// マーカーにクリックイベントを追加
function markerEvent(i) {
    marker[i].addListener('click', function () { // マーカーをクリックしたとき
        infoWindow[i].open(map, marker[i]); // 吹き出しの表示
    });
}

// <!-- vue.jsでコメント投稿機能を作ってみた https://qiita.com/noytdm1021/items/e452b56a083b6f305799 参照 -->
let app = new Vue({  //vueインスタンス生成
    el: '#app', //id="app"が属性として使用されているタグ内で使える。(マウント)
    data: {
        comment: "",
        rate: 0,
        comments: [],
        sun: 0,
        length: false,  //使いたい変数達

    },
    methods: {  //各メソッドを格納。htmlを見てもらえると「v-on:click="メソッド名"」と記述されているところが複数箇所ありますが要素をクリックした際に下記のメソッドを実行するという意味です。
        submit: function () {
            if (this.comment == "") return;
            if (this.comment.length > 100) return;
            let commentItem = {
                comment: this.comment,
                rate: this.rate
            }
            this.comments.unshift(commentItem);
            this.sun = this.sun + Number(commentItem.rate)
            this.comment = ""
            this.rate = 0
            if (this.comments.length > 0) {
                this.length = true
            }
        },
        deleteItem: function (index) {
            this.sun = this.sun - Number(this.comments[index].rate);
            this.comments.splice(index, 1);
            if (this.comments.length < 1) {
                this.length = false
            }
        },
        sortUp:function(){
            let arr =  this.comments;
            arr.sort(function(a,b){
                if (a.rate > b.rate) return 1;
                if (a.rate < b.rate) return -1;
                return 0;
            })
            this.comments = arr;
        },
        sort:function(){
            let arr =  this.comments;
            arr.sort(function(a,b){
                if (a.rate > b.rate) return -1;
                if (a.rate < b.rate) return 1;
                return 0;
            })
            this.comments = arr;
        },



    },
    computed:{  //算出プロパティと言います。変数averageScoreをhtml側で呼び出すと
//自動的に関数内の処理を実行してくれます。他にも監視プロパティというものもありますが監視プロパティに比べて
//処理結果をキャッシュしてくれるというのが大きな特徴です。
        averageScore:function(){
            return (this.sun/this.comments.length).toFixed(2)
        }

    }

})
// 投稿機能部分終了
