function secondsToHms(t, format = 'common', divider = ',', mask = 'h m s') {
  const labels = {
    h: {
      common: [' hour', ' hours'],
      medium: [' hour', ' hours'],
      short: ['h', 'h'],
    },
    m: {
      common: [' minute', ' minutes'],
      medium: [' min', ' min'],
      short: ['m', 'm'],
    },
    s: {
      common: [' second', ' seconds'],
      medium: [' sec', ' sec'],
      short: ['s', 's'],
    },
  };
  const d = Number(t);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor(d % 3600 % 60);

  const time = {
    h: h > 0 ? h + (h === 1 ? labels.h[format][0] : labels.h[format][1]) : '',
    m: m > 0 ? m + (m === 1 ? labels.m[format][0] : labels.m[format][1]) : '',
    s: s > 0 ? s + (s === 1 ? labels.s[format][0] : labels.s[format][1]) : '',
  };
  const all = [];
  mask.split(' ').forEach((key) => {
    all.push(time[key] || '');
  });
  return all.filter(i => !!i).join(`${divider} `);
}

export default secondsToHms;
