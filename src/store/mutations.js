export default {
  setCurrentInfo(state, info) {
    if (!info.year || !info.month || !info.date) {
      console.error('update year error');
      return;
    }

    state.current_info.year = info.year;
    state.current_info.month = info.month;
    state.current_info.date = info.date;
    state.current_info.hour = info.hour;
    state.current_info.minute = info.minute;
  },
  setSdate(state, sdate) {
    state.sdate = sdate;
  },
  setEdate(state, edate) {
    state.edate = edate;
  },
  setUser(state, user) {
    state.user = user;
  },
  setContentId(state, contentId) {
    state.contentId = contentId;
  },
  setDetail(state, detail) {
    state.detail = detail;
  },
  setAdvance(state, show_advance) {
    state.show_advance = show_advance;
  },
  setYearUser(state, year_user) {
    state.year_user = year_user;
  },
  setIsMiniprogram(state, is_miniprogram) {
    state.is_miniprogram = is_miniprogram;
  },
  setProductions(state, productions) {
    state.productions = productions;
  },
};
