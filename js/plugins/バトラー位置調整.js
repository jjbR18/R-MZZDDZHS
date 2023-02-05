/*:ja
 * @plugindesc バトラーの位置を下げる
 * @author KICHUREA
 *
 * @param bt_x
 * @desc 
 * @default 450
 *
 * @param bt_y
 * @desc 
 * @default 400
 * @help このプラグインには、プラグインコマンドはありません。
 */
(function() {

    var parameters = PluginManager.parameters('バトラー位置調整');
    var btx = Number(parameters['bt_x'] || 0);
    var bty = Number(parameters['bt_y'] || 0);

Sprite_Battler.prototype.updatePosition = function() {

if (this._battlerName.match(/boss/)) {
    this.x = this._homeX + this._offsetX + 484;
    this.y = this._homeY + this._offsetY + 456;
        } else {
    this.x = this._homeX + this._offsetX + btx;
    this.y = this._homeY + this._offsetY + bty;
        }

};

})();