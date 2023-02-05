/*:ja
 * @plugindesc ピクチャーを表示するとき記憶
 * @author KICHUREA
 *
 * @help $gameScreen.showPicture_kic(1)
 */

(function() {


///メッセージウインドウの位置変更/////////////////////////////////////////////////////
Window_Message.prototype.updatePlacement = function() {
this._positionType = $gameMessage.positionType();
this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
if(this._positionType === 2) this.y -= 10;
this.x = 250;
};
Window_Message.prototype.windowWidth = function() {
return Graphics.boxWidth - 450;
};





///★画像閲覧の配列を設定する。/////////////////////////////////////////////////////★
///アクターIDの配列/////////////////////////////////////////
Game_Screen.prototype.ev_num_cus = function() { ///$gameScreen.ev_num_cus()[]
return [0,1,3,4,5,6,7,8,9,10,
11,12,13,14,15,16,17,18,19,20,
21,22,23,24,25,26,27,28,29,30,
31,32,33,34,35,36,37,38,39,40,
41,42,43,44,45,46,47,48,49,50,
51,52,53,54,55,56,57,58,59,60,
61,62,63,64,65,66,67,68,69,70,
71,72,73,74,75,76,77,78,79,80,
81,82,83,84,85,86,87,88,89,90,
91,92,93,94,95,96,97,98,99,100,
101,102,103,104,105,106,107,108,109,110,
111,112,113,114,115,116,117,118,119,120]
};
///その他イベント画像の配列/////////////////////////////////////////
Game_Screen.prototype.ev_other_id = function() { ///$gameScreen.ev_other_id()[]
return [0,2,4,570,201,219,202,218,211,221,214,222,215,223,243,250,244,251,245,284,273,274,298,299,309,310,347,
311,312,314,315,316,317,318,319,320,321,322,323,324,329,330,331,332,333,334,335,344,404,405,406,407,410,411,
412,413,412,415,416,417,418,419,420,421,422,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,
451,456,457,458,459,460,461,465,258,466,467,468,469,470,492,493,260,262,264,471,472,473,474,475,498,499,476,477,478,479,480,481,482,483,484,485,486,487,488,596,598,599,601,
489,490,491,497,501,529,530,531,546,502,503,504,505,506,507,532,533,547,508,509,510,511,517,518,519,520,521,522,523,515,512,513,514,
516,534,535,536,537,524,525,526,527,528,538,539,540,541,542,543,544,545,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,
564,565,566,567,568,569,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,597,
9999]
};
///変数４３番の番号のクラスIDを取得する。
Game_Screen.prototype.get_cid_picbook = function() { return $gameScreen.ev_num_cus()[$gameVariables.value(43)] }; ///$gameScreen.get_cid_picbook() 
Game_Screen.prototype.get_ev_other_id = function() { return $gameScreen.ev_other_id()[$gameVariables.value(43)] }; ///$gameScreen.get_ev_other_id()
////////////////////////////////////////////////////////////////////////////////////////////////////////////☆

///★バトルメンバーのアクターID立ち絵を変数１２０の配列に記録する。/////////////////////////////////////////////////////★
///$gameScreen.save_act_classid()
//コモンイベント・随時情報の更新で使う。配列がリセットされてしまうバグあり？
Game_Screen.prototype.save_act_classid = function() { 
if ( Array.isArray($gameVariables._data[120]) == false ) { $gameVariables._data[120] = [];}
$gameVariables._data[120][$gameParty.battleMembers()[0]._classId] = 1;
if ( $gameParty.battleMembers().length >= 2 ) { $gameVariables._data[120][$gameParty.battleMembers()[1]._classId] = 1;}
if ( $gameParty.battleMembers().length >= 3 ) { $gameVariables._data[120][$gameParty.battleMembers()[2]._classId] = 1;}
if ( $gameParty.battleMembers().length >= 4 ) { $gameVariables._data[120][$gameParty.battleMembers()[3]._classId] = 1;}
$gameVariables._data[120][1] = 1 
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////☆

///指定アクターのアクターID立ち絵を５番に表示する（進化前）/////////////////////////////////////////////////////★
///$gameScreen.showPicture_actstpic(1)
Game_Screen.prototype.showPicture_actstpic = function(id, x = 350) {
    var picture = new Game_Picture();
///var name = $dataClasses[$gameActors.actor(id)._classId].meta.stand_picture  ///進化後の画像ならこれ
var name = $dataClasses[id].meta.stand_picture

var ev_part = "../enemies/"
if ( $gameSwitches.value(18) == true ) {ev_part = ev_part + "N" ;} 
$gameScreen.showPicture(5,ev_part + name,0,x,0,100,100,255,0);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////☆


///オリジナルのピクチャ５番に表示。変数１５に配列で格納される。/////////////////////////////////////////////////////
///$gameScreen.showPicture_kic(1)
Game_Screen.prototype.showPicture_kic = function(name_id) {
    var realPictureId = this.realPictureId(5);//ピクチャID5に表示する
    var picture = new Game_Picture();


///18:健全スイッチONならイベント画像を表示しない
if ( $gameSwitches.value(18) == true ) { 
return console.log(4545555555);;
}
///ここで操作。１で表示済み。
///v15  そのナンバーのピクチャーID
///v120 表示したクラスID。
if ( Array.isArray($gameVariables._data[15]) == false ) { $gameVariables._data[15] = [];}
if ( $gameVariables._data[15][name_id] != 1 ) { $gameVariables._data[15][name_id] = 1;}



////画像IDが１００以上ならパートを変更しNAMEIDを１００で割る
var ev_part = "ev"
if ( $gameSwitches.value(9) == true ) {ev_part = "b";} 
if ( $gameSwitches.value(9) == true && $gameSwitches.value(18) == true ) {ev_part = "Nb";} 

if        ( name_id <= 99 ) {ev_part = ev_part  ;
} else if ( name_id <= 199 ){ev_part = ev_part + "1" ;name_id = name_id % 100 ;
} else if ( name_id <= 299 ){ev_part = ev_part + "2" ;name_id = name_id % 100 ; 
} else if ( name_id <= 399 ){ev_part = ev_part + "3" ;name_id = name_id % 100 ; 
} else if ( name_id <= 499 ){ev_part = ev_part + "4" ;name_id = name_id % 100 ; 
} else if ( name_id <= 599 ){ev_part = ev_part + "5" ;name_id = name_id % 100 ; 
} else if ( name_id <= 699 ){ev_part = ev_part + "6" ;name_id = name_id % 100 ; 
} else if ( name_id <= 799 ){ev_part = ev_part + "7" ;name_id = name_id % 100 ; 
} else if ( name_id <= 899 ){ev_part = ev_part + "8" ;name_id = name_id % 100 ; 
} else                      {ev_part = ev_part ;name_id = name_id % 100  ;}

///ネームIDを画像名に追加する
    if ( name_id <= 9 )          { name = ev_part + "_00" + name_id ;
     } else if ( name_id <= 99 ) { name = ev_part + "_0" + name_id ;
     } else                      { name = ev_part + "_" + name_id ;} 
    picture.show(name, 0, 0, 0, 100, 100, 255, 0);
    this._pictures[realPictureId] = picture;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////

///ピクチャーのナンバーを表示/////////////////////////////////////////////////////
///$gameScreen.showPicture_num(1)
Game_Screen.prototype.showPicture_num = function(num_id) {
    var realPictureId = this.realPictureId(6);//ピクチャID6に表示する
    var realPictureId2 = this.realPictureId(7);
    var realPictureId3 = this.realPictureId(8);
    var picture = new Game_Picture();
    var picture2 = new Game_Picture();
    var picture3 = new Game_Picture();

///数字の大きさごとに分岐
    if ( num_id <= 1 )          { num_id = 1;} 
    if ( num_id <= 9 )          { 
    picture.show("num_00" + num_id, 0, 180, 0, 100, 100, 255, 0) ;this._pictures[realPictureId] = picture;
    
     } else if ( num_id <= 99 ) { 
    picture.show("num_00" + ( num_id % 10 ), 0, 180, 0, 100, 100, 255, 0) ;this._pictures[realPictureId] = picture;
    picture2.show("num_00" + ( Math.floor(num_id / 10) ), 0, 120, 0, 100, 100, 255, 0) ;this._pictures[realPictureId2] = picture2;
    
     } else                      { 
    picture.show("num_00" + ( num_id % 10 ), 0, 180, 0, 100, 100, 255, 0) ;this._pictures[realPictureId] = picture;
    picture2.show("num_00" + ( Math.floor(num_id % 100 / 10) ), 0, 120, 0, 100, 100, 255, 0) ;this._pictures[realPictureId2] = picture2;
    picture3.show("num_00" + ( Math.floor(num_id / 100) ), 0, 60, 0, 100, 100, 255, 0) ;this._pictures[realPictureId3] = picture3;
    } 

    
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////






})();
