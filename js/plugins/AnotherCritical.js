//=============================================================================
// AnotherCritical.js
//=============================================================================

/*:ja
 * @plugindesc ver1.01 定期的にバトラーがヘマします。
 * @author まっつＵＰ
 * 
 * @param rate
 * @desc マイナス会心時のダメージ率（百分率）
 * @default 70
 * 
 * @param srate
 * @desc マイナス会心時のダメージに使用者の
 * このIDのステート有効度を乗せます。
 * @default 20
 * 
 * @param text
 * @desc 対象がアクターの時のマイナス会心時のテキスト
 * @default マイナス会心！
 * 
 * @param text2
 * @desc 対象がアクターでない時のマイナス会心時のテキスト
 * @default 敵へマイナス会心！
 * 
 * @param sename
 * @type file
 * @require 1
 * @dir audio/se
 * @desc SEのファイルネーム
 * @default Absorb1
 * 
 * @param sevolume
 * @desc SEのボリューム
 * @default 90
 * 
 * @param sepitch
 * @desc SEのピッチ
 * @default 100
 * 
 * @param sepan
 * @desc SEの位相
 * @default 0
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * マイナス会心時の効果を追加します。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 * 
 * ver1.01 マイナス会心時SEを鳴らせるようにしました。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
var parameters = PluginManager.parameters('AnotherCritical');
var ACrate = Number(parameters['rate'] || 70);
var ACsrate = Number(parameters['srate'] || 20);
var ACtext = String(parameters['text'] || '');
var ACtext2 = String(parameters['text2'] || '');
var ACsename = parameters['sename'];
var ACsevolume = Number(parameters['sevolume'] || 90);
var ACsepitch = Number(parameters['sepitch'] || 100);
var ACsepan = Number(parameters['sepan'] || 0);

var ACseCri = {"name":ACsename,"pan":ACsepan,"pitch":ACsepitch,"volume":ACsevolume};
var AnotherCri = false;

var _Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
    var cr = this.subject().cri;
    if(cr < 0){
        AnotherCri = true;
        cr = Math.abs(cr);
        return this.item().damage.critical ? cr * (1 - target.cev) : 0;
    }
    return _Game_Action_itemCri.call(this, target);
};

//デフォルトでは四捨五入はダメージ計算の最後に行われる。
var _Game_Action_applyCritical = Game_Action.prototype.applyCritical;
Game_Action.prototype.applyCritical = function(damage) {
    if(AnotherCri){
        AudioManager.loadStaticSe(ACseCri);
        return damage * ACrate / 100 * this.subject().stateRate(ACsrate);
    }
    return _Game_Action_applyCritical.call(this, damage);
};

var _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    AnotherCri = false;
};

var _Sprite_Damage_setupCriticalEffect = Sprite_Damage.prototype.setupCriticalEffect;
Sprite_Damage.prototype.setupCriticalEffect = function() {
    if(AnotherCri){
        this._flashColor = [127, 0, 127, 127];
        this._flashDuration = 60;
        return;
    }
    _Sprite_Damage_setupCriticalEffect.call(this);
};

var _Window_BattleLog_displayCritical = Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    if (target.result().critical && AnotherCri) {
        if (target.isActor()) {
            this.push('addText', ACtext);
        } else {
            this.push('addText', ACtext2);
        }
        AudioManager.playStaticSe(ACseCri);
        return;
    }
    _Window_BattleLog_displayCritical.call(this, target);
};
 
})();
