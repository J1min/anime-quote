export const deepcopy = <T>(portfolioList: T): T => {
  return JSON.parse(JSON.stringify(portfolioList));
};
