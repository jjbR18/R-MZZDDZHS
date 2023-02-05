/*:ja
 * @plugindesc 変数にIDなどを取得する。
 * @author KICHUREA
 *
 * @help 特に無し。
 */

(function() {

////アクターが行動///////////////////////////////////////////////////////////////////////////////////////////////
Game_Action.prototype.subject = function() {
if (this._subjectActorId > 0) {

///if (this._item._itemId == 7 and this._item._dataClass == "skill" ) {   ///種付けのときだけインデックスを１０に緊急取得
///if (this._targetIndex >= 0 ) { $gameVariables.setValue(10, $gameTroop.members()[this._targetIndex]._enemyId); }
///}  ///if終了
             
             
       $gameSwitches.setValue(11, true);
       $gameVariables.setValue(12, this._subjectActorId);
       $gameVariables.setValue(246, this._subjectActorId);
       console.log($gameVariables.value(12));

        return $gameActors.actor(this._subjectActorId);
    } else {
////バトラーが行動/////////////////////////////////////////////////
///こしふり使用時にスイッチON
///if (this._item._dataClass == "skill") {
///if ($dataSkills[this._item._itemId].note.match(/typ:こしふり/)) {$gameSwitches.setValue(12, true)} else {$gameSwitches.setValue(12, false)}
/// }///if終了
       
       $gameSwitches.setValue(11, false);
       $gameVariables.setValue(11, $gameTroop.members()[this._subjectEnemyIndex]._enemyId);
       $gameVariables.setValue(13, this._subjectEnemyIndex);
       $gameVariables.setValue(246, 0);
        return $gameTroop.members()[this._subjectEnemyIndex];
}///if終了

};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})();
