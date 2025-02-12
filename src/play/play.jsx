import React from 'react';
import './play.css'

export function Play() {
  return (
    <main>
    <section id="puzzle">
        <h2>
          <label for="timer">Time:</label>
          <input type="time" id="timer" value="--" readonly />
        </h2>
        <h3>
          Puzzle # XXXXXX
        </h3>

        <table class="centered">
          <tr>
            <td class="block1"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block1"><input type="number" min='1' max='9'/> </td>
            <td class="block1"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
          </tr>
          <tr>
            <td class="block1"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block1"><input type="number" min='1' max='9'/> </td>
            <td class="block1"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
          </tr>
          <tr>
            <td class="block1"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block1"><input type="number" min='1' max='9'/> </td>
            <td class="block1"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block2"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
            <td class="block3"><input type="number" min='1' max='9'/> </td>
          </tr>
          <tr>
            <td class="block4"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block4"><input type="number" min='1' max='9'/> </td>
            <td class="block4"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
          </tr>
          <tr>
            <td class="block4"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block4"><input type="number" min='1' max='9'/> </td>
            <td class="block4"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
          </tr>
          <tr>
            <td class="block4"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block4"><input type="number" min='1' max='9'/> </td>
            <td class="block4"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block5"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
            <td class="block6"><input type="number" min='1' max='9'/> </td>
          </tr>
          <tr>
            <td class="block7"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block7"><input type="number" min='1' max='9'/> </td>
            <td class="block7"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
          </tr>
          <tr>
            <td class="block7"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block7"><input type="number" min='1' max='9'/> </td>
            <td class="block7"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
          </tr>
          <tr>
            <td class="block7"><input type="number" min='1' max='9' maxlength="1"/> </td>
            <td class="block7"><input type="number" min='1' max='9'/> </td>
            <td class="block7"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block8"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
            <td class="block9"><input type="number" min='1' max='9'/> </td>
          </tr>
        </table>
        <br/>
        <button type="button" class="btn btn-primary">SUBMIT</button>
      </section>
    </main>
  );
}