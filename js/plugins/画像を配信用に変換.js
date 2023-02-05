/*:ja
 * @plugindesc スイッチ１８がオンの時画像の頭にNをつける
 * @author KICHUREA
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */
(function() {

///////////////////////////////////////////////////

Game_Enemy.prototype.battlerName = function() {
    if ( $gameSwitches.value(18) == true ) {return "N" + this.enemy().battlerName;}
    return this.enemy().battlerName;
};

/////////////////////////////////////////////////////////

})();