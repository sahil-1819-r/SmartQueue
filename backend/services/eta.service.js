export const estimateEta = ({ positionInQueue, averageWaitMinutes }) => {
  return positionInQueue * averageWaitMinutes;
};
