const DATABASE_QUERY = {

    'get_state': "select st.unitName, cnt.currentState FROM setup as st,controls as cnt;",
    'actualValues' : 'select ct.speedType as chartvaluespeedType,ct.actualSpeed,ct.actualTemp,ev.name as title,ev.eventType,ev.description,ev.createdAt as timeval,st.unitName as name ,cnt.accel as accelarationprofile,cnt.decel as decelerationProfile,cnt.timeACEMode1,cnt.timeACEMode2,cnt.speedInRpm,cnt.speedInRcf,cnt.speedType as controlSpeedType,cnt.time as cotrolTime,cnt.temprature as controltemp,cnt.currentState,cnt.loadedProgram,cnt.usedRotor  from chartvalue as ct,events as ev,setup as st,controls as cnt order by ct.createdAt,ev.createdAt desc limit 1;'

}




module.exports = DATABASE_QUERY;