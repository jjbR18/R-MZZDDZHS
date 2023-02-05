/*:ja
 * @plugindesc 歩行グラを固定する
 * @author KICHUREA
 *
 * @help 移動速度を４から５に設定 乗り物 船
 */

(function() {



                             
    var _Game_CharacterBase_prototype_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers  = function() {
    _Game_CharacterBase_prototype_initMembers.call(this);
    this._walkAnime = false;
    this._stepAnime = false;
    };

Game_Player.prototype.getOffVehicle = function() {
    if (this.vehicle().isLandOk(this.x, this.y, this.direction())) {
        if (this.isInAirship()) {
            this.setDirection(2);
        }
        this._followers.synchronize(this.x, this.y, this.direction());
        this.vehicle().getOff();
        if (!this.isInAirship()) {
            this.forceMoveForward();
            this.setTransparent(false);
        }
        this._vehicleGettingOff = true;
        this.setMoveSpeed(4);    ////////////////////////////移動速度を４から５に設定 乗り物 船
        this.setThrough(false);
        this.makeEncounterCount();
        this.gatherFollowers();
    }
    return this._vehicleGettingOff;
};


Game_Player.prototype.updateVehicleGetOn = function() {
    if (!this.areFollowersGathering() && !this.isMoving()) {
        this.setDirection(this.vehicle().direction());
        this.setMoveSpeed(this.vehicle().moveSpeed() + 1);
        this._vehicleGettingOn = false;
        this.setTransparent(true);
        if (this.isInAirship()) {
            this.setThrough(true);
        }
        this.vehicle().getOn();
    }
};





/////////////////////////////////////////////////////////////////////////////////////////////////////

var _Sprite_Character_prototype_characterPatternX = Sprite_Character.prototype.characterPatternX;
Sprite_Character.prototype.characterPatternX = function() {
    return 1;
};
var _Sprite_Character_prototype_characterPatternY = Sprite_Character.prototype.characterPatternY;
Sprite_Character.prototype.characterPatternY = function() {
if (this._characterName == '!Chest') {
    return _Sprite_Character_prototype_characterPatternY.call(this);
} else {
    return 0;
};


};





})();
