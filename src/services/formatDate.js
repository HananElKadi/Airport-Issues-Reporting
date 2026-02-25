const formatDateParts = timestamp => {
  const date = new Date(timestamp);
  const weekday = date.toLocaleString('en-GB', {
    weekday: 'short',
  });

  const day = date.toLocaleString('en-GB', {
    day: '2-digit',
  });

  const time = date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return { weekday, day, time };
};

export default formatDateParts;
