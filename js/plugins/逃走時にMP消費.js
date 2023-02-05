/*:ja
 * @plugindesc 逃走時にMP消費
 * @author KICHUREA
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {

                        
    var _BattleManager_processEscape = BattleManager.processEscape;
    BattleManager.processEscape  = function() {
   $gameSwitches.setValue(19, true);
    _BattleManager_processEscape.call(this);

    };



})();
