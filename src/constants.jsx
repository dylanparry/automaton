import React from 'react';

export class Status {
    static Valid = {
        INVALID: 0,
        VALID: 1,
    }

    static Error = {
        NO: 0,
        YES: 1,
    }

    static Answer = {
        YES: 0,
        NO: 1,
    }

    static Initialised = {
        NO: 0,
        YES: 1,
    }

    static Battery = {
        OK: 0,
        LOW: 1,
    }

    static LinkStatus = {
        OK: 0,
        ERROR: 1,
    }

    static Panel = {
        UNLOCKED: 0,
        LOCKED: 1,
    }

    static Gateway = {
        UNKNOWN: 0,
        KNOWN: 1,
    }

    static DayLightSavings = {
        INACTIVE: 0,
        ACTIVE: 1,
    }

    static Mode = {
        AUTO: 0,
        MANUAL: 1,
        VACATION: 2,
        BOOST: 3,
    }
}

const paddingBeforeIcon = {
    marginLeft: 10,
};

export class Icons {
    static Boost = <span className="fa fa-plus-circle" style={paddingBeforeIcon} />;
    static Heating = <span className="icon fa fa-fw fa-thermometer" />;
    static Home = <span className="fa fa-home" />;
    static Invalid = <span className="fa fa-times" style={paddingBeforeIcon} />;
    static LinkStatusError = <span className="fa fa-wifi" style={paddingBeforeIcon} />;
    static LowBattery = <span className="fa fa-battery-quarter" style={paddingBeforeIcon} />;
    static RangeArrow = <span className="fa fa-long-arrow-right" />;
    static Settings = <span className="icon fa fa-fw fa-cog" />;
    static ThermostatActive = <span className="fa fa-snowflake-o" />;
    static Warning = <span className="fa fa-warning" style={paddingBeforeIcon} />;
    static Weather = <span className="icon fa fa-fw fa-sun-o" />;
}
