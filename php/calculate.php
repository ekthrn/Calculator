<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $result = calculateResult($data);

    echo json_encode(['result' => $result]);
}

function calculateResult($data)
{
    $numbers = $data['numbers'];
    $operators = $data['operators'];
    $result = (int) ($numbers[0]);
    $c = 0;

    for ($i = 0; $i < count($numbers); $i += 2) {
        $operator = $operators[$i];
        $operand = (int) ($numbers[$i + 1]);

        switch ($operator) {
            case '+':
                $result += $operand;
                break;
            case '-':
                $result -= $operand;
                break;
            case '×':
                $result *= $operand;
                break;
            case '÷':

                if ($operand != 0) {
                    $result /= $operand;
                } else {
                    return null;
                }
                break;
        }
    }

    return $result;
}
?>