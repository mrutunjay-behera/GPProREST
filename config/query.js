const DATABASE_QUERY = {

    'get_state': "SELECT unitName FROM setup;",
    'actual_value': "SELECT ace,powerDown,rcf,rpm,state,temperature,time FROM ActualValues;",
    'error_code': "SELECT code,description,title,time FROM Error;",
    'get_name': "SELECT name FROM State;",
    'set_values':"SELECT accelerationProfile,ace,decelerationProfile,rcf,rpm,temperature,time,brakeOffSpeed,slowStartEnabled,slowStopEnabled FROM SetValues;",
    'actualValues' : 'select ct.speedType as chartvaluespeedType,ct.actualSpeed,ct.actualTemp,ev.name as title,ev.eventType,ev.description,ev.createdAt as timeval,st.unitName as name ,cnt.accel as accelarationprofile,cnt.decel as decelerationProfile,cnt.timeACEMode1,cnt.timeACEMode2,cnt.speedInRpm,cnt.speedInRcf,cnt.speedType as controlSpeedType,cnt.time as cotrolTime,cnt.temprature as controltemp from chartvalue as ct,events as ev,setup as st,controls as cnt order by ct.createdAt,ev.createdAt desc limit 1;'

}




module.exports = DATABASE_QUERY;