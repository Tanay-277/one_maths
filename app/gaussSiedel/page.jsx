import { gaussSeidel } from '../../utils/gaussSiedel';

const YourComponent = () => {
  // Usage example
  const matrix = [[3.0, 1.0], [2.0, 6.0]];
  const vector = [5.0, 9.0];
  const guess = [0.0, 0.0];

  const result = gaussSeidel(matrix, vector, guess, 2, 0.00000000000001);

  return (
    <div>
      <p>{result}</p>
    </div>
  );
};

export default YourComponent;
