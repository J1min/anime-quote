#include <iostream>
using namespace std;

void swap(int &a, int &b)
{
  int tmp;

  // 호출된 함수 내부에서 예외 처리를 하여 throw를 통해 catch에 보낸다.
  if (a == b)
    throw a;

  tmp = a;
  a = b;
  b = tmp;
}

int main(void)
{
  int num1;
  int num2;

  try
  {
    cin >> num1;
    cin >> num2;

    // try 내부에서 swap 함수 호출.
    swap(num1, num2);

    cout << "\n[swap 완료]" << endl;
    cout << "num1 : " << num1 << ", num2 : " << num2 << endl;
  }
  catch (int expn)
  { // throw를 통해 변수를 인자값으로 받는다.
    cout << "\n[swap 실패]" << endl;
    cout << "num1, num2 : " << expn << " 으로 동일합니다." << endl;
  }
  catch (char expn)
  { // throw를 통해 변수를 인자값으로 받는다.
    cout << "\n[swap 실패]" << endl;
    cout << "num1, num2 : " << expn << " 으로 동일합니다." << endl;
  }

  cout << "==== Program End ====" << endl;
  return 0;
}
